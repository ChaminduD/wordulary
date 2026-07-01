"use client";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/icons/google-icon";

export function GoogleAuthButton() {
    const handleSignIn = async () => {
        const supabase = createClient();

        await supabase.auth.signInWithOAuth({
            provider: "google",
            options: {
                redirectTo: `${window.location.origin}/auth/callback`,
            },
        });
    };

    return (
        <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleSignIn}
        >
            <GoogleIcon className="size-4" />
            Continue with Google
        </Button>
    );
}