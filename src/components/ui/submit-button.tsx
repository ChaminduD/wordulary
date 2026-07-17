"use client";

import { useFormStatus } from "react-dom";
import type { ComponentProps, ReactNode } from "react";

import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type SubmitButtonProps = {
    children: ReactNode;
    pendingText: string;
} & ComponentProps<typeof Button>;

export function SubmitButton({
    children,
    pendingText,
    disabled,
    ...props
}: SubmitButtonProps) {
    const { pending } = useFormStatus();

    return (
        <Button
            type="submit"
            disabled={pending || disabled}
            {...props}
        >
            {pending && <LoadingSpinner />}

            {pending ? pendingText : children}
        </Button>
    );
}