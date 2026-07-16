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

    return (
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
            <SelectTrigger className="w-full sm:w-64">
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
    );
}