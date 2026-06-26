"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type StatusSelectorProps = {
    termId: string;
    status: string;
    aiGenerated: boolean;
};

export function StatusSelector({ termId, status, aiGenerated }: StatusSelectorProps) {
    const router = useRouter();

    const [saving, setSaving] = useState(false);

    async function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
        const nextStatus = event.target.value;

        try {
            setSaving(true);

            const response =
                await fetch(
                    `/api/terms/${termId}/status`,
                    {
                        method: "PATCH",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        body: JSON.stringify({ status: nextStatus, }),
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
            <h3 className="font-medium">
                Status
            </h3>

            <select
                defaultValue={status}
                onChange={handleChange}
                disabled={saving}
                className="rounded border px-3 py-2"
            >
                <option value="new">
                    New
                </option>

                <option
                    value="learning"
                    disabled={!aiGenerated}
                >
                    Learning
                </option>

                <option
                    value="mastered"
                    disabled={!aiGenerated}
                >
                    Mastered
                </option>
            </select>

            {!aiGenerated && (
                <p className="text-sm text-muted-foreground">
                    Generate AI content to unlock Learning and Mastered.
                </p>
            )}

            {saving && (
                <span className="ml-2 text-sm text-muted-foreground">Saving...</span>
            )}
        </div>
    );
}