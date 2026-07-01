"use client";

import { useRouter } from "next/navigation";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

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
        <Select
            value={selectedCollectionId ?? "all"}
            onValueChange={(value) => {
                if (value === "all") {
                    router.push("/dashboard/review");
                    return;
                }

                router.push(`/dashboard/review?collection=${value}`);
            }}
        >
            <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="All Learning Terms" />
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