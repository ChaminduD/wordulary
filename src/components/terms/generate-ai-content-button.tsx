"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type GenerateAiContentButtonProps = {
    termId: string;
};

export function GenerateAiContentButton({ termId }: GenerateAiContentButtonProps) {
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
            <Button
                type="button"
                disabled={loading}
                onClick={handleGenerate}
            >
                {loading
                    ? "Generating..."
                    : "Generate"}
            </Button>
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