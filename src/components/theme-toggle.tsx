"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useSyncExternalStore } from "react";
import { Button } from "@/components/ui/button";
import { getSidebarLinkClass } from "@/lib/sidebar-link";

const emptySubscribe = () => () => { };

type ThemeToggleProps = {
    variant?: "icon" | "sidebar";
};

export function ThemeToggle({
    variant = "icon",
}: ThemeToggleProps) {
    const { resolvedTheme, setTheme } = useTheme();

    const mounted = useSyncExternalStore(
        emptySubscribe,
        () => true,
        () => false
    );

    if (!mounted) {
        return null;
    }

    const isDark = resolvedTheme === "dark";

    const toggleTheme = () => {
        setTheme(isDark ? "light" : "dark");
    };

    const icon = isDark ? (
        <Sun className="size-5" />
    ) : (
        <Moon className="size-5" />
    );

    if (variant === "sidebar") {
        return (
            <button
                type="button"
                onClick={toggleTheme}
                className={getSidebarLinkClass(false)}
                aria-label="Toggle theme"
            >
                {icon}

                <span>Appearance</span>
            </button>
        );
    }

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            aria-label="Toggle theme"
        >
            {icon}
        </Button>
    );
}