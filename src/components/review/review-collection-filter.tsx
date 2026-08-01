"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

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
    const [isPending, startTransition] = useTransition();

    if (collections.length === 0) {
        return null;
    }

    return (
        <section className="space-y-3">
            <div>
                <h2
                    id="collection-heading"
                    className="text-lg font-semibold"
                >
                    Collection
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Review terms from all collections or focus on one collection.
                </p>
            </div>

            <Select
                disabled={isPending}
                value={selectedCollectionId ?? "all"}
                onValueChange={(value) => {
                    startTransition(() => {
                        if (value === "all") {
                            router.push("/dashboard/review");
                            return;
                        }

                        router.push(`/dashboard/review?collection=${value}`);
                    });
                }}
            >
                <SelectTrigger
                    aria-labelledby="collection-heading"
                    className="w-full sm:w-64"
                >
                    <div className="flex w-full items-center justify-between">
                        <SelectValue placeholder="All Learning Terms" />

                        {isPending && (
                            <LoadingSpinner className="ml-2 size-4 shrink-0" />
                        )}
                    </div>
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="all">
                        All Learning Terms
                    </SelectItem>

                    {collections.map((collection) => (
                        <SelectItem
                            key={collection.id}
                            value={collection.id}
                        >
                            {collection.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </section>
    );
}