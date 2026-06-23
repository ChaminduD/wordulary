"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { navigation } from "@/lib/navigation";

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

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background md:hidden">
            <div className="flex justify-around">
                {navigation.map((item) => {
                    const Icon = icons[item.icon];

                    const isActive =
                        pathname === item.href ||
                        (
                            item.href !== "/dashboard" &&
                            pathname.startsWith(item.href)
                        );

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={
                                isActive
                                    ? "flex flex-col items-center gap-1 p-3 text-primary"
                                    : "flex flex-col items-center gap-1 p-3 text-muted-foreground"
                            }
                        >
                            <Icon className="h-5 w-5" />

                            <span className="text-xs">
                                {item.label}
                            </span>
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
}