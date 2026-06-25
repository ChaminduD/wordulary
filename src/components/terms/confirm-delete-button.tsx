"use client";

import { Button } from "@/components/ui/button";

type ConfirmDeleteButtonProps = {
    label?: string;
    termName: string;
};

export function ConfirmDeleteButton({
    label = "Delete",
    termName,
}: ConfirmDeleteButtonProps) {
    return (
        <Button
            type="submit"
            variant="destructive"
            size="sm"
            onClick={(event) => {
                const confirmed = window.confirm(
                    `Are you sure you want to delete "${termName}"?`
                );

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            {label}
        </Button>
    );
}