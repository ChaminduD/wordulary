import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/logo";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Verify Your Email",
};

export default async function SignUpSuccessPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (user) {
        redirect("/dashboard");
    }

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border p-6 text-center">
                <div className="flex justify-center">
                    <Logo
                        priority
                        className="mx-auto"
                    />
                </div>

                <div>
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Check Your Email
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve sent you a verification link. Please verify your email
                        before signing in.
                    </p>
                </div>

                <Button
                    variant="outline"
                    asChild
                    className="w-full"
                >
                    <Link href="/login">
                        Back to Sign In
                    </Link>
                </Button>
            </div>
        </main>
    );
}