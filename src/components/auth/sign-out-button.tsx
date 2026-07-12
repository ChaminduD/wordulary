"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";

type SignOutButtonProps = {
    className?: string;
};

export function SignOutButton({ className }: SignOutButtonProps) {
    const router = useRouter();

    const handleSignOut = async () => {
        const supabase = createClient();

        await supabase.auth.signOut();

        router.push("/login");
        router.refresh();
    };

    return (
        <Button
            type="button"
            variant="outline"
            className={className}
            onClick={handleSignOut}
        >
            Sign Out
        </Button>
    );
}