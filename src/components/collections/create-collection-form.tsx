"use client";

import { useState } from "react";
import { createCollection } from "@/actions/collections";
import { Button } from "@/components/ui/button";

export function CreateCollectionForm() {
    const [name, setName] = useState("");
    const [message, setMessage] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        try {
            setLoading(true);
            setError(null);
            setMessage(null);

            const formData = new FormData();

            formData.append(
                "name",
                name
            );

            const result = await createCollection(formData);

            if (result?.error) {
                setError(result.error);

                return;
            }

            setMessage("Collection created.");

            setName("");
        } finally {
            setLoading(false);
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="space-y-4"
        >
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

            <input
                type="text"
                value={name}
                onChange={(event) => {
                    setName(event.target.value);
                    setError(null);
                    setMessage(null);
                }}
                placeholder="Collection name"
                className="w-full rounded border px-3 py-2"
            />

            <Button
                type="submit"
                disabled={loading}
            >
                {loading
                    ? "Creating..."
                    : "Create"}
            </Button>
        </form>
    );
}