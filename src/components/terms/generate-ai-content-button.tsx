"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type GenerateAiContentButtonProps = {
    termId: string;
};

export function GenerateAiContentButton({ termId, }: GenerateAiContentButtonProps) {
    const [loading, setLoading] = useState(false);

    const router = useRouter();

    async function handleGenerate() {
        try {
            setLoading(true);

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
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            className="rounded border px-4 py-2"
            disabled={loading}
            onClick={handleGenerate}
        >
            {loading
                ? "Generating..."
                : "Generate AI Content"}
        </button>
    );
}