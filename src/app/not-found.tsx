import type { Metadata } from "next";
import Link from "next/link";

import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
    title: "Page Not Found",
};

export default function NotFound() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="max-w-md text-center">
                <div className="space-y-8">
                    <Logo
                        href="/"
                        priority
                        className="mx-auto"
                    />

                    <div className="space-y-4">
                        <p className="text-7xl font-bold tracking-tight text-primary">
                            404
                        </p>

                        <h1 className="text-3xl font-semibold tracking-tight">
                            Page Not Found
                        </h1>

                        <p className="leading-7 text-muted-foreground">
                            The page you&apos;re looking for doesn&apos;t exist or may
                            have been moved.
                        </p>
                    </div>

                    <Button
                        asChild
                        size="lg"
                    >
                        <Link href="/">
                            Back to Home
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    );
}