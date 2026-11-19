"use client";

import PortfolioFormEditor from "./PortfolioFormEditor";
import MediaItemsEditor from "./MediaItemsEditor";

type JsonRecord = Record<string, unknown>;

const blockSchemas: Record<string, JsonRecord> = {
    heading: { type: "heading", text: "" },
    paragraph: { type: "paragraph", text: "" },
    quote: { type: "quote", text: "", attribution: "" },
    code: { type: "code", language: "", code: "", caption: "" },
    image: { type: "image", url: "", alt: "", caption: "" },
    video: { type: "video", url: "", title: "", poster: "", caption: "" },
    gallery: { type: "gallery", items: [], caption: "" },
};

const isRecord = (value: unknown): value is JsonRecord =>
    typeof value === "object" && value !== null && !Array.isArray(value);

function getBlockType(block: unknown) {
    if (!isRecord(block) || typeof block.type !== "string" || !blockSchemas[block.type]) {
        return "paragraph";
    }
    return block.type;
}

export default function ContentBlockEditor({
    blocks,
    onChange,
}: {
    blocks: unknown[];
    onChange: (blocks: unknown[]) => void;
}) {
    function updateBlock(index: number, block: unknown) {
        onChange(blocks.map((current, blockIndex) => blockIndex === index ? block : current));
    }

    return (
        <section className="mt-6 space-y-4 border-t border-neutral-200 pt-5">
            <header>
                <h3 className="font-gmono text-xs uppercase tracking-widest text-neutral-600">Ordered content</h3>
                <p className="mt-1 text-xs text-neutral-500">Add and arrange text, images, videos, galleries, quotes, and code blocks.</p>
            </header>
            {blocks.length === 0 ? (
                <p className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-500">No content blocks yet.</p>
            ) : (
                <ol className="space-y-3">
                    {blocks.map((block, index) => {
                        const type = getBlockType(block);
                        const record = isRecord(block) ? block : blockSchemas[type];
                        const schema = blockSchemas[type];
                        const galleryItems = Array.isArray(record.items) ? record.items : [];

                        return (
                            <li className="border border-neutral-200 p-3 sm:p-4" key={index}>
                                <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
                                    <label className="font-gmono text-[10px] uppercase text-neutral-500">
                                        Block {index + 1}
                                        <select
                                            className="ml-2 border border-neutral-300 bg-white px-2 py-1 text-xs normal-case text-neutral-800"
                                            onChange={(event) => updateBlock(index, { ...blockSchemas[event.target.value] })}
                                            value={type}
                                        >
                                            {Object.keys(blockSchemas).map((blockType) => (
                                                <option key={blockType} value={blockType}>{blockType}</option>
                                            ))}
                                        </select>
                                    </label>
                                    <span className="flex items-center gap-2">
                                        <button
                                            aria-label="Move content block up"
                                            className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                                            disabled={index === 0}
                                            onClick={() => {
                                                const next = [...blocks];
                                                [next[index - 1], next[index]] = [next[index], next[index - 1]];
                                                onChange(next);
                                            }}
                                            type="button"
                                        >↑</button>
                                        <button
                                            aria-label="Move content block down"
                                            className="rounded border px-2 py-1 text-xs disabled:opacity-40"
                                            disabled={index === blocks.length - 1}
                                            onClick={() => {
                                                const next = [...blocks];
                                                [next[index + 1], next[index]] = [next[index], next[index + 1]];
                                                onChange(next);
                                            }}
                                            type="button"
                                        >↓</button>
                                        <button
                                            className="font-gmono text-[10px] uppercase text-red-700 hover:underline"
                                            onClick={() => onChange(blocks.filter((_, blockIndex) => blockIndex !== index))}
                                            type="button"
                                        >Remove</button>
                                    </span>
                                </div>
                                <PortfolioFormEditor
                                    label="Block fields"
                                    value={record}
                                    schema={schema}
                                    excludedFields={type === "gallery" ? ["type", "items"] : ["type"]}
                                    onChange={(value) => updateBlock(index, { ...(isRecord(value) ? value : {}), type })}
                                />
                                {type === "gallery" && (
                                    <div className="mt-3">
                                        <MediaItemsEditor
                                            items={galleryItems}
                                            label="Gallery items"
                                            onChange={(items) => updateBlock(index, { ...record, type, items })}
                                        />
                                    </div>
                                )}
                            </li>
                        );
                    })}
                </ol>
            )}
            <div className="flex flex-wrap gap-2">
                {Object.keys(blockSchemas).map((type) => (
                    <button
                        className="border border-neutral-300 px-3 py-2 font-gmono text-[10px] uppercase text-neutral-700 hover:border-neutral-900"
                        key={type}
                        onClick={() => onChange([...blocks, { ...blockSchemas[type] }])}
                        type="button"
                    >
                        + {type}
                    </button>
                ))}
            </div>
        </section>
    );
}
