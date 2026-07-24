"use client";

import { useState } from "react";
import { LoadingSpinner } from "../ui/loading-spinner";

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
    const [selectedIds, setSelectedIds] = useState(selectedCollectionIds);

    const [saving, setSaving] = useState(false);

    async function handleChange(
        collectionId: string,
        checked: boolean
    ) {
        if (saving) return;

        const previousIds = [...selectedIds];

        try {
            setSaving(true);

            if (checked) {
                setSelectedIds(prev => [...prev, collectionId]);
            } else {
                setSelectedIds(prev =>
                    prev.filter(id => id !== collectionId)
                );
            }

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
        } catch (error) {
            console.error(error);

            setSelectedIds(previousIds);
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
                        className="flex cursor-pointer items-center gap-2"
                    >
                        <input
                            type="checkbox"
                            checked={selectedIds.includes(collection.id)}
                            disabled={saving}
                            onChange={(event) =>
                                handleChange(
                                    collection.id,
                                    event.target.checked
                                )
                            }
                            className="cursor-pointer disabled:cursor-not-allowed"
                        />

                        {collection.name}
                    </label>
                )
            )}

            {saving && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LoadingSpinner className="size-3" />
                    Saving...
                </div>
            )}
        </div>
    );
}