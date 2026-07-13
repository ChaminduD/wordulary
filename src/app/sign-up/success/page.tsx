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
                        If a verification email was sent, please check your inbox and spam folder before signing in.
                    </p>
                </div>

                <p className="text-sm text-muted-foreground">
                    If you&apos;ve previously signed in with Google, use{" "}
                    <span className="font-medium text-foreground">
                        Continue with Google
                    </span>{" "}
                    on the Sign In page instead of creating a password.
                </p>

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