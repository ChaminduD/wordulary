"use client";

import { useState } from "react";

export function ImportTermsForm() {
    const [termsText, setTermsText] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    async function handleImport() {
        const terms = termsText
            .split("\n")
            .map((term) => term.trim())
            .filter(Boolean);

        if (terms.length === 0) {
            return;
        }

        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            const response = await fetch(
                "/api/import-terms",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        terms,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Import failed");
            }

            const importedLabel =
                data.imported === 1
                    ? "term"
                    : "terms";

            const skippedLabel =
                data.skipped === 1
                    ? "duplicate"
                    : "duplicates";

            setMessage(
                `Imported ${data.imported} ${importedLabel}. Skipped ${data.skipped} ${skippedLabel}.`
            );
            setTermsText("");
        } catch (error) {
            setError(error instanceof Error ? error.message : "Import failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-4">
            {message && (
                <p className="text-sm">
                    {message}
                </p>
            )}

            {error && (
                <p className="text-sm text-red-500">
                    {error}
                </p>
            )}
            <textarea
                value={termsText}
                onChange={(event) =>
                    setTermsText(
                        event.target.value
                    )
                }
                placeholder="Enter one term per line"
                className="min-h-[250px] w-full rounded border p-3"
            />

            <button
                onClick={handleImport}
                className="rounded border px-4 py-2"
                disabled={loading}
            >
                {loading ? "Importing..." : "Import Terms"}
            </button>
        </div>
    );
}