"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    House,
    BookOpen,
    FolderOpen,
    Brain,
    User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const icons = {
    home: House,
    book: BookOpen,
    folder: FolderOpen,
    brain: Brain,
    profile: User,
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
            className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                isActive
                    ? "bg-muted text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
        >
            <Icon className="size-5" />

            <span>{label}</span>
        </Link>
    );
}