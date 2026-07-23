"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { getSidebarLinkClass } from "@/lib/sidebar-link";

type SignOutButtonProps = {
    className?: string;
    variant?: "default" | "sidebar";
};

export function SignOutButton({
    className,
    variant = "default",
}: SignOutButtonProps) {
    const router = useRouter();

    const [isSigningOut, setIsSigningOut] = useState(false);

    async function handleSignOut() {
        try {
            setIsSigningOut(true);

            const supabase = createClient();

            await supabase.auth.signOut();

            router.push("/login");
            router.refresh();
        } finally {
            setIsSigningOut(false);
        }
    }

    if (variant === "sidebar") {
        return (
            <button
                type="button"
                className={getSidebarLinkClass(false)}
                onClick={handleSignOut}
                disabled={isSigningOut}
            >
                {isSigningOut ? (
                    <LoadingSpinner />
                ) : (
                    <LogOut className="size-5" />
                )}

                <span>
                    {isSigningOut ? "Signing Out..." : "Sign Out"}
                </span>
            </button>
        );
    }

    return (
        <Button
            type="button"
            variant="outline"
            className={className}
            onClick={handleSignOut}
            disabled={isSigningOut}
        >
            {isSigningOut && <LoadingSpinner />}

            {isSigningOut ? "Signing Out..." : "Sign Out"}
        </Button>
    );
}