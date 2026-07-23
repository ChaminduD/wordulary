"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSidebarLinkClass } from "@/lib/sidebar-link";
import { User } from "lucide-react";

type AccountLinkProps = {
    href: string;
    label: string;
};

export function AccountLink({
    href,
    label,
}: AccountLinkProps) {
    const pathname = usePathname();

    const isActive =
        pathname === href ||
        (
            href !== "/dashboard" &&
            pathname.startsWith(href)
        );

    return (
        <Link
            href={href}
            className={getSidebarLinkClass(isActive)}
        >
            <User className="size-5" />

            <span>{label}</span>
        </Link>
    );
}