"use client";

import { useState } from "react";
import type { GeneratedTerm } from "@/types/term";
import { TermPreviewCard } from "@/components/terms/term-preview-card";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type TermGeneratorProps = {
    collections: {
        id: string;
        name: string;
    }[];
};

export function TermGenerator({ collections, }: TermGeneratorProps) {
    const [generatedTerm, setGeneratedTerm] = useState<GeneratedTerm | null>(null);
    const [term, setTerm] = useState("");
    const [loading, setLoading] = useState(false);
    const [generateError, setGenerateError] = useState<string | null>(null);
    const [saveError, setSaveError] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [selectedCollectionIds, setSelectedCollectionIds] = useState<string[]>([]);

    const router = useRouter();

    const isRegenerate = generatedTerm &&
        term.trim().toLowerCase() ===
        generatedTerm.term.trim().toLowerCase();

    async function handleGenerate() {
        if (!term.trim()) {
            return;
        }

        try {
            setGenerateError(null);
            setSaveError(null);

            setLoading(true);

            const response = await fetch(
                "/api/generate-term",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ term, }),
                }
            );

            if (!response.ok) {
                const errorData = await response.json();

                throw new Error(errorData.error ?? "Failed to generate term");
            }

            const generatedTerm = await response.json();

            setGeneratedTerm(generatedTerm);

            setGenerateError(null);
            setSaveError(null);
        } catch (error) {
            console.error(error);
            setGenerateError(error instanceof Error ? error.message : "Something went wrong");
        } finally {
            setLoading(false);
        }
    }

    async function handleSave() {
        if (!generatedTerm) {
            return;
        }

        try {
            setSaving(true);
            setSaveError(null);

            const response =
                await fetch(
                    "/api/save-term",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            ...generatedTerm,
                            collectionIds: selectedCollectionIds,
                        }),
                    }
                );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Save failed");
            }

            router.push("/dashboard/terms");
        } catch (error) {
            console.error(error);
            setSaveError(error instanceof Error ? error.message : "Failed to save term");
        } finally {
            setSaving(false);
        }
    }

    function handleCollectionChange(
        collectionId: string,
        checked: boolean
    ) {
        if (checked) {
            setSelectedCollectionIds((current) => [
                ...current,
                collectionId,
            ]);

            return;
        }

        setSelectedCollectionIds((current) =>
            current.filter((id) => id !== collectionId)
        );
    }

    return (
        <div>
            <div className="space-y-4">
                <input
                    type="text"
                    value={term}
                    onChange={(event) => {
                        setTerm(event.target.value);

                        setGenerateError(null);
                        setSaveError(null);
                    }}
                    placeholder="Enter a word, phrase, or idiom"
                    className="w-full rounded border px-3 py-2"
                />

                <Button
                    onClick={handleGenerate}
                    disabled={loading || saving}
                >
                    {loading
                        ? "Generating..."
                        : isRegenerate
                            ? "Regenerate"
                            : "Generate"}
                </Button>
            </div>

            {generateError && (
                <p className="text-sm text-red-500">
                    {generateError}
                </p>
            )}

            {generatedTerm && (
                <div className="space-y-4 mt-4">
                    <TermPreviewCard
                        generatedTerm={generatedTerm}
                    />

                    <div className="space-y-2">
                        <h3 className="font-medium">
                            Collections (optional)
                        </h3>

                        {collections.map((collection) => (
                            <label
                                key={collection.id}
                                className="flex items-center gap-2"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedCollectionIds.includes(collection.id)}
                                    onChange={(event) =>
                                        handleCollectionChange(
                                            collection.id,
                                            event.target.checked
                                        )
                                    }
                                />

                                {collection.name}
                            </label>
                        ))}
                    </div>

                    {saveError && (
                        <p className="text-sm text-red-500">
                            {saveError}
                        </p>
                    )}
                    <Button
                        type="button"
                        onClick={handleSave}
                        disabled={saving || loading}
                    >
                        {saving ? "Saving..." : "Save Term"}
                    </Button>
                </div>

            )}
        </div>
    );
}