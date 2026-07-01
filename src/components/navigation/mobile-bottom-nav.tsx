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
import { cn } from "@/lib/utils";

const icons = {
    home: House,
    book: BookOpen,
    folder: FolderOpen,
    brain: Brain,
};

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe pt-1 md:hidden">
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
                            className={cn(
                                "flex flex-col items-center gap-1 rounded-lg px-4 py-3 text-xs transition-colors",
                                isActive
                                    ? "text-primary"
                                    : "text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <Icon
                                className={cn(
                                    "size-5 transition-colors",
                                    isActive
                                        ? "text-primary"
                                        : "text-muted-foreground"
                                )}
                            />

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