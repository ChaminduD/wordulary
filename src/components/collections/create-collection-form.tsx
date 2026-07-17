"use client";

import { useState } from "react";
import { createCollection } from "@/actions/collections";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
        <section className="space-y-4">
            <div>
                <h2 className="text-lg font-semibold">
                    Create Collection
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Group related vocabulary together.
                </p>
            </div>

            <form
                onSubmit={handleSubmit}
                className="space-y-4"
            >
                {message && (
                    <p className="text-sm text-muted-foreground">
                        {message}
                    </p>
                )}

                {error && (
                    <p className="text-sm text-destructive">
                        {error}
                    </p>
                )}

                <div className="flex flex-col gap-3 sm:flex-row">
                    <Input
                        type="text"
                        value={name}
                        onChange={(event) => {
                            setName(event.target.value);
                            setError(null);
                            setMessage(null);
                        }}
                        placeholder="Collection name"
                    />

                    <Button
                        type="submit"
                        className="w-full sm:w-auto"
                        disabled={loading}
                    >
                        {loading && <LoadingSpinner />}

                        {loading ? "Creating..." : "Create"}
                    </Button>
                </div>
            </form>
        </section>
    );
}