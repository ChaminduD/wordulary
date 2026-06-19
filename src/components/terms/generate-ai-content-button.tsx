"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GenerateAiContentButtonProps = {
    termId: string;
};

export function GenerateAiContentButton({ termId, }: GenerateAiContentButtonProps) {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const router = useRouter();

    async function handleGenerate() {
        try {
            setLoading(true);
            setError(null);

            const response = await fetch(
                `/api/terms/${termId}/generate`,
                {
                    method: "POST",
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Generation failed");
            }

            router.refresh();
        } catch (error) {
            console.error(error);

            setError(
                error instanceof Error
                    ? error.message
                    : "Failed to generate AI content"
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <button
                className="rounded border px-4 py-2"
                disabled={loading}
                onClick={handleGenerate}
            >
                {loading
                    ? "Generating..."
                    : "Generate AI Content"}
            </button>
            {
                error && (
                    <p className="text-sm text-red-500">
                        {error}
                    </p>
                )
            }
        </>
    );
}