"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    BookOpen,
    FolderOpen,
    Brain,
} from "lucide-react";

const icons = {
    home: House,
    book: BookOpen,
    folder: FolderOpen,
    brain: Brain,
};

type NavLinkProps = {
    href: string;
    label: string;
    icon: keyof typeof icons;
};

export function NavLink({
    href,
    label,
    icon,
}: NavLinkProps) {
    const pathname = usePathname();

    const Icon = icons[icon];

    const isActive =
        pathname === href ||
        (
            href !== "/dashboard" &&
            pathname.startsWith(href)
        );

    return (
        <Link
            href={href}
            className={
                isActive
                    ? "flex items-center gap-3 rounded-md bg-muted px-3 py-2 font-medium"
                    : "flex items-center gap-3 rounded-md px-3 py-2 hover:bg-muted"
            }
        >
            <Icon className="h-4 w-4" />

            <span>
                {label}
            </span>
        </Link>
    );
}