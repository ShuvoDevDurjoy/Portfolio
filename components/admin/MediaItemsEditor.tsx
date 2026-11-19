"use client";

import PortfolioFormEditor from "./PortfolioFormEditor";

type JsonRecord = Record<string, unknown>;

const imageSchema = { type: "image", url: "", alt: "" };
const videoSchema = { type: "video", url: "", title: "", poster: "" };

const isRecord = (value: unknown): value is JsonRecord =>
    typeof value === "object" && value !== null && !Array.isArray(value);

function isVideo(item: unknown) {
    return isRecord(item) && item.type === "video";
}

export default function MediaItemsEditor({
    items,
    onChange,
    label = "Media",
}: {
    items: unknown[];
    onChange: (items: unknown[]) => void;
    label?: string;
}) {
    function updateItem(index: number, item: unknown) {
        onChange(items.map((current, itemIndex) => itemIndex === index ? item : current));
    }

    return (
        <fieldset className="space-y-3 border border-neutral-200 p-3 sm:p-4">
            <legend className="px-2 font-gmono text-xs uppercase tracking-wider text-neutral-600">{label}</legend>
            {items.length === 0 ? (
                <p className="text-xs text-neutral-500">No media added.</p>
            ) : (
                <ol className="space-y-3">
                    {items.map((item, index) => {
                        const record = isRecord(item) ? item : {};
                        const video = isVideo(record);

                        return (
                            <li className="border-l-2 border-[#d97a5c] pl-3" key={index}>
                                <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                                    <label className="font-gmono text-[10px] uppercase text-neutral-500">
                                        Media type
                                        <select
                                            className="ml-2 border border-neutral-300 bg-white px-2 py-1 text-xs normal-case text-neutral-800"
                                            onChange={(event) => {
                                                const next = event.target.value === "video" ? videoSchema : imageSchema;
                                                updateItem(index, { ...next, url: record.url ?? "" });
                                            }}
                                            value={video ? "video" : "image"}
                                        >
                                            <option value="image">Image</option>
                                            <option value="video">Video</option>
                                        </select>
                                    </label>
                                    <span className="flex items-center gap-2">
                                        <button
                                            aria-label="Move media up"
                                            className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                                            disabled={index === 0}
                                            onClick={() => {
                                                const next = [...items];
                                                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                                                onChange(next);
                                            }}
                                            type="button"
                                        >↑</button>
                                        <button
                                            aria-label="Move media down"
                                            className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                                            disabled={index === items.length - 1}
                                            onClick={() => {
                                                const next = [...items];
                                                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                                                onChange(next);
                                            }}
                                            type="button"
                                        >↓</button>
                                        <button
                                            className="font-gmono text-[10px] uppercase text-red-700 hover:underline"
                                            onClick={() => onChange(items.filter((_, itemIndex) => itemIndex !== index))}
                                            type="button"
                                        >Remove</button>
                                    </span>
                                </div>
                                <PortfolioFormEditor
                                    label="Media details"
                                    value={record}
                                    schema={video ? videoSchema : imageSchema}
                                    excludedFields={["type"]}
                                    onChange={(value) => updateItem(index, { ...(isRecord(value) ? value : {}), type: video ? "video" : "image" })}
                                />
                            </li>
                        );
                    })}
                </ol>
            )}
            <div className="flex flex-wrap gap-2">
                <button className="border border-neutral-300 px-3 py-2 font-gmono text-[10px] uppercase hover:border-neutral-900" onClick={() => onChange([...items, { ...imageSchema }])} type="button">+ Image</button>
                <button className="border border-neutral-300 px-3 py-2 font-gmono text-[10px] uppercase hover:border-neutral-900" onClick={() => onChange([...items, { ...videoSchema }])} type="button">+ Video</button>
            </div>
        </fieldset>
    );
}
