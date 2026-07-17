"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { LoadingSpinner } from "../ui/loading-spinner";

type StatusSelectorProps = {
    termId: string;
    status: string;
    aiGenerated: boolean;
};

export function StatusSelector({ termId, status, aiGenerated }: StatusSelectorProps) {
    const router = useRouter();

    const [saving, setSaving] = useState(false);

    async function handleChange(nextStatus: string) {
        try {
            setSaving(true);

            const response = await fetch(
                `/api/terms/${termId}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        status: nextStatus,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error ?? "Failed to update status");
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
            <div>
                <h2 className="text-lg font-semibold">
                    Status
                </h2>

                {!aiGenerated && (
                    <p className="mt-1 text-sm text-muted-foreground">
                        Generate AI content to unlock Learning and Mastered.
                    </p>
                )}
            </div>

            <Select
                value={status}
                onValueChange={handleChange}
                disabled={saving}
            >
                <SelectTrigger className="w-full sm:w-64">
                    <SelectValue />
                </SelectTrigger>

                <SelectContent>
                    <SelectItem value="new">
                        New
                    </SelectItem>

                    <SelectItem
                        value="learning"
                        disabled={!aiGenerated}
                    >
                        Learning
                    </SelectItem>

                    <SelectItem
                        value="mastered"
                        disabled={!aiGenerated}
                    >
                        Mastered
                    </SelectItem>
                </SelectContent>
            </Select>

            {saving && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <LoadingSpinner className="size-3" />
                    Saving...
                </div>
            )}
        </div>
    );
}