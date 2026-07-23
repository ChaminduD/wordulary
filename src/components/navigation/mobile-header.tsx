"use client"

import Link from "next/link";
import { User } from "lucide-react";
import { LogoMark } from "../branding/logo-mark";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

export function MobileHeader() {
    const pathname = usePathname();

    const isActive = pathname.startsWith("/dashboard/profile");

    return (
        <header className="fixed inset-x-0 top-0 z-40 border-b bg-background md:hidden">
            <div className="flex h-16 items-center justify-between px-6">
                <LogoMark
                    href="/dashboard"
                    priority
                />

                <div className="flex items-center gap-1">
                    <ThemeToggle />

                    <Button
                        asChild
                        variant="ghost"
                        size="icon"
                        className={cn(
                            isActive && "bg-muted text-primary"
                        )}
                    >
                        <Link
                            href="/dashboard/profile"
                            aria-label="Profile"
                        >
                            <User className="size-5" />
                        </Link>
                    </Button>
                </div>
            </div>
        </header>
    );
}