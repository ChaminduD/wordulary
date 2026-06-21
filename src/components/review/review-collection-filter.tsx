"use client";

import { useRouter } from "next/navigation";

type ReviewCollectionFilterProps = {
    collections: {
        id: string;
        name: string;
    }[];

    selectedCollectionId?: string;
};

export function ReviewCollectionFilter({
    collections,
    selectedCollectionId,
}: ReviewCollectionFilterProps) {
    const router = useRouter();

    return (
        <select
            value={selectedCollectionId ?? ""}
            onChange={(event) => {
                const collectionId = event.target.value;

                if (!collectionId) {
                    router.push("/dashboard/review");

                    return;
                }

                router.push(`/dashboard/review?collection=${collectionId}`);
            }}
            className="rounded border px-3 py-2"
        >
            <option value="">
                All Learning Terms
            </option>

            {collections.map(
                (collection) => (
                    <option
                        key={collection.id}
                        value={collection.id}
                    >
                        {collection.name}
                    </option>
                )
            )}
        </select>
    );
}