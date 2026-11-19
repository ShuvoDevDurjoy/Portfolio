import "server-only";
import { createClient } from "@supabase/supabase-js";
import { cacheLife, cacheTag } from "next/cache";
import {
  type PortfolioSectionContent,
  type PortfolioSectionKey,
} from "@/components/portfolio-schema";
import { hasEnvVars } from "@/lib/utils";

async function loadSection(
  section: PortfolioSectionKey,
  supabaseUrl: string,
  publishableKey: string,
) {
  "use cache";
  cacheLife("minutes");
  cacheTag(`portfolio-section-${section}`);

  const supabase = createClient(supabaseUrl, publishableKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
  const { data, error } = await supabase
    .from("portfolio_sections")
    .select("content")
    .eq("section", section)
    .maybeSingle();

  if (error) {
    throw new Error(`Unable to load portfolio section "${section}": ${error.message}`);
  }

  return data?.content ?? null;
}

export async function getPortfolioSection<K extends PortfolioSectionKey>(
  section: K,
): Promise<PortfolioSectionContent[K] | null> {
  if (!hasEnvVars) {
    return null;
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error("Supabase URL and publishable key must both be configured.");
  }

  return await loadSection(section, supabaseUrl, publishableKey) as PortfolioSectionContent[K] | null;
}

export function hasPortfolioContent(value: unknown): boolean {
  if (typeof value === "string") {
    return value.trim().length > 0;
  }
  if (typeof value === "number") {
    return Number.isFinite(value) && value !== 0;
  }
  if (typeof value === "boolean") {
    return value;
  }
  if (Array.isArray(value)) {
    return value.some(hasPortfolioContent);
  }
  if (typeof value === "object" && value !== null) {
    return Object.entries(value).some(([key, item]) =>
      key !== "id" && key !== "type" && hasPortfolioContent(item),
    );
  }
  return false;
}
