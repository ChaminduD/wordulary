"use client";

import { DeleteButton } from "@/components/ui/delete-button";
import { Trash2 } from "lucide-react";

type ConfirmDeleteButtonProps = {
    label?: string;
    termName: string;
    iconOnly?: boolean;
};

export function ConfirmDeleteButton({
    label = "Delete",
    termName,
    iconOnly = false,
}: ConfirmDeleteButtonProps) {
    return (
        <DeleteButton
            iconOnly={iconOnly}
            aria-label={`Delete ${termName}`}
            onClick={(event) => {
                const confirmed = window.confirm(
                    `Are you sure you want to delete "${termName}"?`
                );

                if (!confirmed) {
                    event.preventDefault();
                }
            }}
        >
            {iconOnly ? (
                <Trash2 className="size-4" />
            ) : (
                label
            )}
        </DeleteButton>
    );
}