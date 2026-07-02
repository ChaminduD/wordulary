"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navigation } from "@/lib/navigation";
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

const mobileNavigation = navigation.filter(
    (item) => item.href !== "/dashboard/profile"
);

export function MobileBottomNav() {
    const pathname = usePathname();

    return (
        <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background pb-safe md:hidden">
            <div className="flex px-3 py-2">
                {mobileNavigation.map((item) => {
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
                                "flex flex-1 flex-col items-center justify-center gap-0.5 rounded-xl py-2 text-xs transition-colors",
                                isActive
                                    ? "bg-muted text-primary font-medium"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="size-5" />

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