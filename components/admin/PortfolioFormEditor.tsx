"use client";

import type { ChangeEvent } from "react";

type Props = {
    label: string;
    value: unknown;
    schema: unknown;
    onChange: (value: unknown) => void;
    excludedFields?: string[];
    depth?: number;
};

type RecordValue = Record<string, unknown>;

const isRecord = (value: unknown): value is RecordValue =>
    typeof value === "object" && value !== null && !Array.isArray(value);

export function createBlankFormValue(
    schema: unknown,
    generateIds = false,
    fieldName = "",
): unknown {
    if (generateIds && fieldName === "id" && typeof schema === "string") {
        return globalThis.crypto.randomUUID();
    }
    if (Array.isArray(schema)) {
        return [];
    }
    if (isRecord(schema)) {
        return Object.fromEntries(
            Object.entries(schema).map(([key, value]) => [
                key,
                createBlankFormValue(value, generateIds, key),
            ]),
        );
    }
    if (typeof schema === "number") {
        return 0;
    }
    if (typeof schema === "boolean") {
        return false;
    }
    return "";
}

function fieldLabel(value: string) {
    return value
        .replace(/_/g, " ")
        .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function isLongText(name: string, value: string) {
    return /bio|description|excerpt|paragraph|quote|code|text|summary/i.test(name) || value.length > 100;
}

function FormField({
    label,
    value,
    schema,
    onChange,
    excludedFields = [],
    depth = 0,
}: Props) {
    const currentValue = value === undefined ? createBlankFormValue(schema) : value;

    if (Array.isArray(currentValue) || Array.isArray(schema)) {
        const values = Array.isArray(currentValue) ? currentValue : [];
        const schemaItems = Array.isArray(schema) ? schema : [];
        const itemSchema = schemaItems[0] ?? "";

        return (
            <fieldset className="min-w-0 space-y-3 border border-neutral-200 p-3 sm:p-4">
                <legend className="px-2 font-gmono text-xs uppercase tracking-wider text-neutral-600">{label}</legend>
                {values.length === 0 ? (
                    <p className="text-xs text-neutral-500">No items added.</p>
                ) : (
                    <ol className="space-y-3">
                        {values.map((item, index) => (
                            <li className="relative min-w-0 border-l-2 border-[#d97a5c] pl-3" key={index}>
                                <div className="mb-2 flex items-center justify-between gap-3">
                                    <span className="font-gmono text-[10px] uppercase text-neutral-500">Item {index + 1}</span>
                                    <button
                                        className="font-gmono text-[10px] uppercase text-red-700 hover:underline"
                                        onClick={() => onChange(values.filter((_, itemIndex) => itemIndex !== index))}
                                        type="button"
                                    >
                                        Remove
                                    </button>
                                </div>
                                <FormField
                                    label={`${label} ${index + 1}`}
                                    value={item}
                                    schema={itemSchema}
                                    onChange={(nextItem) => onChange(values.map((current, itemIndex) => itemIndex === index ? nextItem : current))}
                                    depth={depth + 1}
                                />
                            </li>
                        ))}
                    </ol>
                )}
                <button
                    className="border border-neutral-300 px-3 py-2 font-gmono text-[10px] uppercase text-neutral-700 transition-colors hover:border-neutral-900"
                    onClick={() => onChange([...values, createBlankFormValue(itemSchema, true)])}
                    type="button"
                >
                    + Add item
                </button>
            </fieldset>
        );
    }

    if (isRecord(currentValue) || isRecord(schema)) {
        const record = isRecord(currentValue) ? currentValue : {};
        const shape = isRecord(schema) ? schema : {};
        const keys = [...new Set([...Object.keys(shape), ...Object.keys(record)])]
            .filter((key) => !excludedFields.includes(key));

        return (
            <div className={depth === 0 ? "grid gap-4 sm:grid-cols-2" : "grid gap-3"}>
                {keys.map((key) => (
                    <FormField
                        key={key}
                        label={fieldLabel(key)}
                        value={record[key]}
                        schema={shape[key]}
                        onChange={(nextValue) => onChange({ ...record, [key]: nextValue })}
                        depth={depth + 1}
                    />
                ))}
                {keys.length === 0 && <p className="text-xs text-neutral-500">No fields available.</p>}
            </div>
        );
    }

    if (typeof currentValue === "boolean" || typeof schema === "boolean") {
        return (
            <label className="flex items-center gap-3 border border-neutral-200 px-3 py-3 text-sm text-neutral-700">
                <input
                    checked={Boolean(currentValue)}
                    className="h-4 w-4 accent-[#d97a5c]"
                    onChange={(event) => onChange(event.target.checked)}
                    type="checkbox"
                />
                {label}
            </label>
        );
    }

    if (typeof currentValue === "number" || typeof schema === "number") {
        return (
            <label className="block min-w-0 text-xs text-neutral-600">
                <span>{label}</span>
                <input
                    className="mt-1 w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-[#d97a5c]"
                    onChange={(event) => onChange(event.target.value === "" ? "" : Number(event.target.value))}
                    type="number"
                    value={typeof currentValue === "number" ? currentValue : ""}
                />
            </label>
        );
    }

    const textValue = typeof currentValue === "string" ? currentValue : "";
    const textProps = {
        className: "mt-1 w-full border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-900 outline-none focus:border-[#d97a5c]",
        onChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            onChange(schema === null && event.target.value === "" ? null : event.target.value);
        },
        value: textValue,
    };

    return (
        <label className="block min-w-0 text-xs text-neutral-600">
            <span>{label}</span>
            {isLongText(label, textValue) ? (
                <textarea {...textProps} className={`${textProps.className} min-h-24 resize-y`} />
            ) : (
                <input {...textProps} type="text" />
            )}
        </label>
    );
}

export default function PortfolioFormEditor(props: Props) {
    return <FormField {...props} />;
}
