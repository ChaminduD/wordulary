"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type SignOutButtonProps = {
    className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
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

    return (
        <Button
            type="button"
            variant="outline"
            className={className}
            onClick={handleSignOut}
            disabled={isSigningOut}
        >
            {isSigningOut && (
                <LoadingSpinner />
            )}

            {isSigningOut ? "Signing Out..." : "Sign Out"}
        </Button>
    );
}