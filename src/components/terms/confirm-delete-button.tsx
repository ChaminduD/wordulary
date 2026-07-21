"use client";

import { DeleteButton } from "@/components/ui/delete-button";

type ConfirmDeleteButtonProps = {
    label?: string;
    termName: string;
};

export function ConfirmDeleteButton({
    label = "Delete",
    termName,
}: ConfirmDeleteButtonProps) {
    return (
        <DeleteButton
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
        </DeleteButton>
    );
}