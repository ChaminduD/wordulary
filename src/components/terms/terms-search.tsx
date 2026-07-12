"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";

export function TermsSearch() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [value, setValue] = useState(searchParams.get("search") ?? "");

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            const params = new URLSearchParams(searchParams);

            if (value.trim()) {
                params.set("search", value.trim());
            } else {
                params.delete("search");
            }

            router.replace(`/dashboard/terms?${params.toString()}`);
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [value, router]);

    return (
        <Input
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search vocabulary..."
        />
    );
}