"use client";

import { DeleteButton } from "@/components/ui/delete-button";
import { Trash2 } from "lucide-react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "@/components/ui/button";

type ConfirmDeleteButtonProps = {
    label?: string;
    itemName: string;
    iconOnly?: boolean;
    variant?: VariantProps<typeof buttonVariants>["variant"];
};

export function ConfirmDeleteButton({
    label = "Delete",
    itemName,
    iconOnly = false,
    variant = "ghost",
}: ConfirmDeleteButtonProps) {
    return (
        <DeleteButton
            iconOnly={iconOnly}
            variant={variant}
            aria-label={`Delete ${itemName}`}
            onClick={(event) => {
                const confirmed = window.confirm(
                    `Are you sure you want to delete "${itemName}"?`
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