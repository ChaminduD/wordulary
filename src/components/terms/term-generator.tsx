"use client";

import { useState } from "react";
import type { GeneratedTerm } from "@/types/term";
import { TermPreviewCard } from "@/components/terms/term-preview-card";

export function TermGenerator() {
    const [generatedTerm, setGeneratedTerm] = useState<GeneratedTerm | null>(null);
    const [term, setTerm] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleGenerate() {
        if (!term.trim()) {
            return;
        }

        try {
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
                throw new Error("Failed to generate term");
            }

            const generatedTerm = await response.json();

            setGeneratedTerm(generatedTerm);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <div className="space-y-4">
                <input
                    type="text"
                    value={term}
                    onChange={(event) =>
                        setTerm(event.target.value)
                    }
                    placeholder="Enter a word, phrase, or idiom"
                    className="w-full rounded border px-3 py-2"
                />

                <button
                    onClick={handleGenerate}
                    disabled={loading}
                    className="rounded border px-4 py-2"
                >
                    {loading ? "Generating..." : "Generate"}
                </button>
            </div>

            {generatedTerm && (
                <TermPreviewCard
                    generatedTerm={generatedTerm}
                />
            )}
        </div>
    );
}