"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";
import { GoogleIcon } from "@/components/icons/google-icon";
import { createClient } from "@/lib/supabase/client";

export function GoogleAuthButton() {
    const [loading, setLoading] = useState(false);

    async function handleSignIn() {
        try {
            setLoading(true);

            const supabase = createClient();

            await supabase.auth.signInWithOAuth({
                provider: "google",
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });
        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    }

    return (
        <Button
            variant="outline"
            className="w-full"
            type="button"
            disabled={loading}
            onClick={handleSignIn}
        >
            {loading ? (
                <>
                    <LoadingSpinner />
                    Redirecting...
                </>
            ) : (
                <>
                    <GoogleIcon className="size-4" />
                    Continue with Google
                </>
            )}
        </Button>
    );
}