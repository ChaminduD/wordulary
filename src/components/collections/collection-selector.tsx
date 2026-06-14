"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type CollectionSelectorProps = {
    termId: string;

    collections: {
        id: string;
        name: string;
    }[];

    selectedCollectionIds: string[];
};

export function CollectionSelector({
    termId,
    collections,
    selectedCollectionIds,
}: CollectionSelectorProps) {
    const router = useRouter();

    const [saving, setSaving] = useState(false);

    async function handleChange(
        collectionId: string,
        checked: boolean
    ) {
        try {
            setSaving(true);

            const response =
                await fetch(
                    `/api/terms/${termId}/collections`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                            collectionId,
                            checked,
                        }),
                    }
                );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to update collection");
            }

            router.refresh();
        } catch (error) {
            console.error(error);
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="space-y-2">
            <h3 className="font-medium">
                Collections
            </h3>

            {collections.map(
                (collection) => (
                    <label
                        key={collection.id}
                        className="flex items-center gap-2"
                    >
                        <input
                            type="checkbox"
                            checked={selectedCollectionIds.includes(collection.id)}
                            disabled={saving}
                            onChange={(event) =>
                                handleChange(
                                    collection.id,
                                    event.target.checked
                                )
                            }
                        />

                        {collection.name}
                    </label>
                )
            )}

            {saving && (
                <p className="text-sm text-muted-foreground">
                    Saving...
                </p>
            )}
        </div>
    );
}