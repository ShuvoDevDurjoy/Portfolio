"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { createMediaUploadUrl, savePortfolioSection, type SaveSectionState } from "@/app/admin/actions";
import CopyButton from "@/components/ui/CopyButton";
import ContentBlockEditor from "./ContentBlockEditor";
import MediaItemsEditor from "./MediaItemsEditor";
import PortfolioFormEditor, { createBlankFormValue } from "./PortfolioFormEditor";
import type { PortfolioSectionKey } from "@/components/portfolio-schema";

type AdminSection = {
    key: PortfolioSectionKey;
    label: string;
    content: unknown;
    schema: unknown;
    updatedAt: string | null;
    isSaved: boolean;
};

type JsonRecord = Record<string, unknown>;

const isRecord = (value: unknown): value is JsonRecord =>
    typeof value === "object" && value !== null && !Array.isArray(value);

function recordLabel(value: unknown, index: number) {
    if (isRecord(value)) {
        for (const key of ["title", "name", "company_name", "institution", "role", "slug"]) {
            if (typeof value[key] === "string" && value[key].trim()) {
                return value[key];
            }
        }
    }
    return `Record ${index + 1}`;
}

export default function AdminDashboard({ sections }: { sections: AdminSection[] }) {
    const [selectedKey, setSelectedKey] = useState<PortfolioSectionKey>(sections[0].key);
    const activeSection = sections.find(({ key }) => key === selectedKey) ?? sections[0];
    const [value, setValue] = useState<unknown>(() =>
        activeSection.content ?? createBlankFormValue(activeSection.schema),
    );
    const [selectedRecordIndex, setSelectedRecordIndex] = useState<number | null>(null);
    const [saveState, setSaveState] = useState<SaveSectionState>({});
    const [uploadState, setUploadState] = useState("");
    const [uploadedUrl, setUploadedUrl] = useState("");
    const [uploadPlacement, setUploadPlacement] = useState<"inline" | "gallery">("inline");
    const [uploading, setUploading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [savedSections, setSavedSections] = useState(() =>
        new Set(sections.filter((section) => section.isSaved).map((section) => section.key)),
    );
    const records = useMemo(() => Array.isArray(value) ? value : [], [value]);
    const isArraySection = Array.isArray(activeSection.schema);
    const supportsBlocks = selectedKey === "projects" || selectedKey === "blogs";
    const selectedRecord = selectedRecordIndex === null ? null : records[selectedRecordIndex] ?? null;
    const selectedRecordObject = isRecord(selectedRecord) ? selectedRecord : null;
    const selectedMedia = selectedRecordObject && Array.isArray(selectedRecordObject.media)
        ? selectedRecordObject.media
        : [];
    const selectedBlocks = selectedRecordObject && Array.isArray(selectedRecordObject.content_blocks)
        ? selectedRecordObject.content_blocks
        : [];
    const recordSchema = isArraySection && Array.isArray(activeSection.schema)
        ? activeSection.schema[0] ?? {}
        : activeSection.schema;

    useEffect(() => {
        setValue(activeSection.content ?? createBlankFormValue(activeSection.schema));
        setSelectedRecordIndex(null);
        setSaveState({});
        setUploadState("");
        setUploadedUrl("");
    }, [selectedKey, activeSection.content, activeSection.schema]);

    function updateValue(nextValue: unknown) {
        setValue(nextValue);
        setSaveState({});
    }

    function updateSelectedRecord(nextRecord: unknown) {
        if (selectedRecordIndex === null) {
            return;
        }
        setValue((current: unknown) => Array.isArray(current)
            ? current.map((record, index) => index === selectedRecordIndex ? nextRecord : record)
            : current);
        setSaveState({});
    }

    function addRecord() {
        const blankRecord = createBlankFormValue(recordSchema, true);
        setValue([...records, blankRecord]);
        setSelectedRecordIndex(records.length);
        setSaveState({});
    }

    function removeSelectedRecord() {
        if (selectedRecordIndex === null) {
            return;
        }
        const nextRecords = records.filter((_, index) => index !== selectedRecordIndex);
        setValue(nextRecords);
        setSelectedRecordIndex(nextRecords.length > 0 ? Math.min(selectedRecordIndex, nextRecords.length - 1) : null);
        setSaveState({});
    }

    function appendUploadedAsset(asset: JsonRecord, topGallery: boolean) {
        if (!selectedRecordObject) {
            setUploadState("Select a record before attaching uploaded media.");
            return;
        }

        if (topGallery) {
            let media = selectedMedia;
            if (media.length === 0) {
                const cover = selectedRecordObject.thumbnail_url ?? selectedRecordObject.cover;
                if (typeof cover === "string" && cover.trim()) {
                    media = [{
                        type: "image",
                        url: cover,
                        alt: `${String(selectedRecordObject.title ?? "Item")} cover`,
                    }];
                }
            }
            updateSelectedRecord({ ...selectedRecordObject, media: [...media, asset] });
        } else {
            updateSelectedRecord({ ...selectedRecordObject, content_blocks: [...selectedBlocks, asset] });
        }
    }

    async function handleUpload(event: ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];
        if (!file) {
            return;
        }

        setUploading(true);
        setUploadState("");
        setSaveState({});

        try {
            const signedUpload = await createMediaUploadUrl(file.name, file.type, file.size);
            const supabase = createClient();
            const { error } = await supabase.storage
                .from("portfolio-media")
                .uploadToSignedUrl(signedUpload.path, signedUpload.token, file, {
                    contentType: file.type,
                });

            if (error) {
                throw new Error(`Upload failed: ${error.message}`);
            }

            setUploadedUrl(signedUpload.publicUrl);
            const asset = file.type.startsWith("video/")
                ? { type: "video", url: signedUpload.publicUrl, title: file.name }
                : { type: "image", url: signedUpload.publicUrl, alt: file.name };
            const topGallery = uploadPlacement === "gallery";
            appendUploadedAsset(asset, topGallery);
            setUploadState(`Uploaded and added to the ${topGallery ? "top media gallery" : "ordered content"}. Save the section to publish.`);
        } catch (error) {
            setUploadState(error instanceof Error ? error.message : "The media upload failed.");
        } finally {
            setUploading(false);
            event.target.value = "";
        }
    }

    async function handleSave(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSaving(true);
        setSaveState({});

        const formData = new FormData();
        formData.set("section", selectedKey);
        formData.set("content", JSON.stringify(value));

        try {
            const result = await savePortfolioSection(formData);
            setSaveState(result);
            if (result.success) {
                setSavedSections((current) => new Set(current).add(selectedKey));
            }
        } catch (error) {
            setSaveState({ error: error instanceof Error ? error.message : "Unable to save this section." });
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="grid gap-6 lg:grid-cols-[15rem_minmax(0,1fr)]">
            <nav aria-label="Portfolio content sections" className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex lg:flex-col">
                {sections.map((section) => (
                    <button
                        aria-pressed={section.key === selectedKey}
                        className={`flex min-h-12 items-center justify-between border px-3 py-2 text-left text-sm transition-colors ${section.key === selectedKey ? "border-neutral-900 bg-neutral-900 text-white" : "border-neutral-200 bg-white hover:border-neutral-400"}`}
                        key={section.key}
                        onClick={() => setSelectedKey(section.key)}
                        type="button"
                    >
                        <span>{section.label}</span>
                        <span className="ml-2 font-gmono text-[10px] opacity-70">{savedSections.has(section.key) ? "Saved" : "Empty"}</span>
                    </button>
                ))}
            </nav>

            <section className="min-w-0 border border-neutral-200 bg-white p-4 shadow-sm sm:p-6">
                <header className="flex flex-wrap items-start justify-between gap-4 border-b border-neutral-200 pb-4">
                    <div>
                        <p className="font-gmono text-xs uppercase tracking-widest text-[#d97a5c]">Section editor</p>
                        <h2 className="mt-1 font-sans text-2xl">{activeSection.label}</h2>
                    </div>
                    <span className={`rounded-full px-3 py-1 font-gmono text-[10px] uppercase ${savedSections.has(activeSection.key) ? "bg-emerald-50 text-emerald-800" : "bg-amber-50 text-amber-800"}`}>
                        {savedSections.has(activeSection.key) ? "Database content" : "No saved content"}
                    </span>
                </header>

                <form className="mt-5" onSubmit={handleSave}>
                    {isArraySection ? (
                        <div className="space-y-5">
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <label className="font-gmono text-xs uppercase tracking-widest text-neutral-500" htmlFor="active-record">
                                    {activeSection.label} records
                                </label>
                                <button
                                    className="border border-neutral-300 px-3 py-2 font-gmono text-[10px] uppercase hover:border-neutral-900"
                                    onClick={addRecord}
                                    type="button"
                                >
                                    + Add record
                                </button>
                            </div>
                            {records.length === 0 ? (
                                <p className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">
                                    No records yet. Add one to start this section.
                                </p>
                            ) : (
                                <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto]">
                                    <select
                                        className="min-w-0 border border-neutral-300 bg-white px-3 py-2 text-sm"
                                        id="active-record"
                                        onChange={(event) => setSelectedRecordIndex(Number(event.target.value))}
                                        value={selectedRecordIndex ?? ""}
                                    >
                                        <option disabled value="">Choose a record</option>
                                        {records.map((record, index) => (
                                            <option key={index} value={index}>{recordLabel(record, index)}</option>
                                        ))}
                                    </select>
                                    <button
                                        className="border border-red-200 px-3 py-2 font-gmono text-[10px] uppercase text-red-700 hover:border-red-500 disabled:opacity-40"
                                        disabled={selectedRecordIndex === null}
                                        onClick={removeSelectedRecord}
                                        type="button"
                                    >
                                        Remove record
                                    </button>
                                </div>
                            )}
                            {selectedRecordIndex !== null && selectedRecord !== null && (
                                <>
                                    <PortfolioFormEditor
                                        label={recordLabel(selectedRecord, selectedRecordIndex)}
                                        value={selectedRecord}
                                        schema={recordSchema}
                                        excludedFields={supportsBlocks ? ["media", "content_blocks"] : []}
                                        onChange={updateSelectedRecord}
                                    />
                                    {supportsBlocks && selectedRecordObject && (
                                        <>
                                            <MediaItemsEditor
                                                items={selectedMedia}
                                                label="Top media gallery"
                                                onChange={(media) => updateSelectedRecord({ ...selectedRecordObject, media })}
                                            />
                                            <ContentBlockEditor
                                                blocks={selectedBlocks}
                                                onChange={(content_blocks) => updateSelectedRecord({ ...selectedRecordObject, content_blocks })}
                                            />
                                        </>
                                    )}
                                </>
                            )}
                        </div>
                    ) : (
                        <PortfolioFormEditor
                            label={activeSection.label}
                            value={value}
                            schema={activeSection.schema}
                            onChange={updateValue}
                        />
                    )}

                    <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-4">
                        <p aria-live="polite" className={`text-sm ${saveState.error ? "text-red-700" : "text-emerald-800"}`}>{saveState.error ?? saveState.success}</p>
                        <button className="rounded-full bg-neutral-900 px-5 py-3 font-gmono text-xs text-white transition-colors hover:bg-[#d97a5c] disabled:cursor-not-allowed disabled:opacity-60" disabled={saving} type="submit">
                            {saving ? "Saving..." : "Save & publish"}
                        </button>
                    </div>
                </form>

                {supportsBlocks && selectedRecordObject && (
                    <div className="mt-6 border-t border-neutral-200 pt-5">
                        <h3 className="font-gmono text-xs uppercase tracking-widest text-neutral-500">Media library</h3>
                        <p className="mt-2 text-xs leading-5 text-neutral-500">Upload JPEG, PNG, WebP, GIF, MP4, WebM, or QuickTime files (up to 100 MB). Choose whether the file goes in the top gallery or at this point in the ordered content.</p>
                        <div className="mt-4 flex flex-wrap items-center gap-3">
                            <label className="flex items-center gap-2 font-gmono text-[10px] uppercase text-neutral-500">
                                Placement
                                <select className="border border-neutral-300 bg-white px-2 py-2 text-xs normal-case text-neutral-800" value={uploadPlacement} onChange={(event) => setUploadPlacement(event.target.value as "inline" | "gallery")}>
                                    <option value="inline">Inline block</option>
                                    <option value="gallery">Top gallery</option>
                                </select>
                            </label>
                            <label className="inline-flex cursor-pointer rounded-full border border-neutral-300 px-4 py-2 font-gmono text-xs transition-colors hover:border-neutral-900">
                                {uploading ? "Uploading..." : "Choose media"}
                                <input className="sr-only" accept="image/jpeg,image/png,image/webp,image/gif,video/mp4,video/webm,video/quicktime" disabled={uploading} onChange={handleUpload} type="file" />
                            </label>
                            {uploadedUrl && <CopyButton label="Copy media URL" value={uploadedUrl} />}
                        </div>
                        <p aria-live="polite" className="mt-3 break-all text-xs leading-5 text-neutral-600">{uploadState}</p>
                    </div>
                )}
            </section>
        </div>
    );
}
