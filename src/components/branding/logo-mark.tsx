"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";

type LogoMarkProps = {
    href?: string;
    className?: string;
    priority?: boolean;
};

const emptySubscribe = () => () => { };

export function LogoMark({
    href = "/",
    className,
    priority = false,
}: LogoMarkProps) {
    const { resolvedTheme } = useTheme();

    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Link
            href={href}
            className={cn("inline-flex", className)}
        >
            <Image
                src={
                    isDark
                        ? "/branding/logo-mark-dark.svg"
                        : "/branding/logo-mark.svg"
                }
                alt="Wordulary"
                width={32}
                height={22}
                priority={priority}
            />
        </Link>
    );
}