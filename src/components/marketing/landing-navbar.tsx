import Link from "next/link";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import type { User } from "@supabase/supabase-js";
import { ThemeToggle } from "@/components/theme-toggle";

type LandingNavbarProps = {
    user: User | null;
};

export function LandingNavbar({ user }: LandingNavbarProps) {
    return (
        <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
            <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
                <Logo
                    href="/"
                    priority
                />

                <nav className="hidden items-center gap-8 md:flex">
                    <Link
                        href="#features"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        Features
                    </Link>

                    <Link
                        href="#how-it-works"
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                        How It Works
                    </Link>
                </nav>

                <div className="flex items-center gap-2">
                    <ThemeToggle />
                    
                    {user ? (
                        <Button asChild>
                            <Link href="/dashboard">
                                Dashboard
                            </Link>
                        </Button>
                    ) : (
                        <>
                            <Button
                                asChild
                                variant="ghost"
                                className="hidden sm:inline-flex"
                            >
                                <Link href="/login">
                                    Sign In
                                </Link>
                            </Button>

                            <Button asChild>
                                <Link href="/sign-up">
                                    Get Started
                                </Link>
                            </Button>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}