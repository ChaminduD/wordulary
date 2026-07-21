"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type DeleteButtonProps =
    ButtonHTMLAttributes<HTMLButtonElement> & {
        children?: ReactNode;
    };

export function DeleteButton({
    children = "Delete",
    ...props
}: DeleteButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            variant="destructive"
            size="sm"
            disabled={pending}
            {...props}
        >
            {pending ? (
                <>
                    <LoadingSpinner className="mr-2 size-4" />
                    Deleting...
                </>
            ) : (
                children
            )}
        </Button>
    );
}