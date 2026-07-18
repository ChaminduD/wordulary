"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { Input } from "@/components/ui/input";
import { LoadingSpinner } from "../ui/loading-spinner";
import { cn } from "@/lib/utils";

export function TermsSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") ?? "");
    const [isPending, startTransition] = useTransition();

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (value.trim()) {
                params.set("search", value.trim());
            } else {
                params.delete("search");
            }

            startTransition(() => {
                router.replace(`/dashboard/terms?${params.toString()}`);
            });
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [value, router]);

    return (
        <div className="relative">
            <Input
                type="search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                placeholder="Search vocabulary..."
                className={cn(isPending && "pr-9")}
            />

            {isPending && (
                <div className="absolute inset-y-0 right-3 flex items-center">
                    <LoadingSpinner className="size-4" />
                </div>
            )}
        </div>
    );
}