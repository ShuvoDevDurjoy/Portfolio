"use server";

import { randomUUID } from "node:crypto";
import { revalidatePath, updateTag } from "next/cache";
import { redirect } from "next/navigation";
import { portfolioSectionKeys } from "@/components/portfolio-schema";
import { requireAdmin } from "@/lib/admin/require-admin";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient } from "@/lib/supabase/server";

export type SaveSectionState = {
  error?: string;
  success?: string;
};

const arraySections = new Set([
  "social_links",
  "projects",
  "blogs",
  "skills",
  "experience",
  "education",
  "achievements",
  "certificates",
  "courses",
]);

export async function savePortfolioSection(formData: FormData): Promise<SaveSectionState> {
  await requireAdmin();

  const section = formData.get("section");
  const rawContent = formData.get("content");
  const sectionKey = typeof section === "string"
    ? portfolioSectionKeys.find((key) => key === section)
    : undefined;

  if (!sectionKey) {
    return { error: "Select a valid portfolio section." };
  }
  if (typeof rawContent !== "string") {
    return { error: "Content is required." };
  }

  let content: unknown;
  try {
    content = JSON.parse(rawContent);
  } catch {
    return { error: "The content is not valid JSON. Correct it before saving." };
  }

  if (arraySections.has(sectionKey) && !Array.isArray(content)) {
    return { error: `The "${sectionKey}" section must be a JSON array.` };
  }
  if (!arraySections.has(sectionKey) && (typeof content !== "object" || content === null || Array.isArray(content))) {
    return { error: `The "${sectionKey}" section must be a JSON object.` };
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("portfolio_sections")
    .upsert(
      { section: sectionKey, content, updated_at: new Date().toISOString() },
      { onConflict: "section" },
    );

  if (error) {
    return { error: `Unable to save this section: ${error.message}` };
  }

  updateTag(`portfolio-section-${sectionKey}`);
  revalidatePath("/", "layout");
  revalidatePath("/admin");
  return { success: "Changes saved and published." };
}

const allowedMediaTypes: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/gif": "gif",
  "video/mp4": "mp4",
  "video/webm": "webm",
  "video/quicktime": "mov",
};

export async function createMediaUploadUrl(
  fileName: string,
  contentType: string,
  fileSize: number,
) {
  const user = await requireAdmin();
  const extension = allowedMediaTypes[contentType];

  if (!extension) {
    throw new Error("Choose a JPEG, PNG, WebP, GIF, MP4, WebM, or QuickTime file.");
  }
  if (!Number.isFinite(fileSize) || fileSize <= 0 || fileSize > 100 * 1024 * 1024) {
    throw new Error("Media files must be smaller than 100 MB.");
  }

  const path = `${user.id}/${randomUUID()}.${extension}`;
  const adminClient = createAdminClient();
  const { data, error } = await adminClient.storage
    .from("portfolio-media")
    .createSignedUploadUrl(path);

  if (error) {
    throw new Error(`Unable to prepare the media upload: ${error.message}`);
  }

  const { data: publicUrl } = adminClient.storage
    .from("portfolio-media")
    .getPublicUrl(path);

  return { path, token: data.token, publicUrl: publicUrl.publicUrl, fileName };
}

export async function signOutAdmin() {
  const supabase = await createClient();
  const { error } = await supabase.auth.signOut();
  if (error) {
    throw new Error(`Unable to sign out: ${error.message}`);
  }
  redirect("/admin/login");
}
