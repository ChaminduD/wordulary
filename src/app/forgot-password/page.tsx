import Link from "next/link";
import { Logo } from "@/components/branding/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { forgotPasswordAction } from "@/actions/forgot-password";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Forgot Password",
};

type PageProps = {
    searchParams: Promise<{
        success?: string;
        error?: string;
    }>;
};

export default async function ForgotPasswordPage({ searchParams, }: PageProps) {
    const { success, error, } = await searchParams;

    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border p-8">
                <div className="space-y-6 text-center">
                    <Logo
                        priority
                        className="mx-auto"
                    />

                    <div className="space-y-2">
                        <h1 className="text-xl font-semibold tracking-tight">
                            Forgot your password?
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Enter your email and we&apos;ll send you a link to reset your password.
                        </p>
                    </div>
                </div>

                {success === "sent" && (
                    <p className="text-center text-sm text-green-600">
                        Password reset link sent. Check your email.
                    </p>
                )}

                {error === "reset_failed" && (
                    <p className="text-center text-sm text-destructive">
                        Something went wrong. Please try again.
                    </p>
                )}

                {error === "rate_limit" && (
                    <p className="text-center text-sm text-destructive">
                        Please wait a moment before requesting another reset email.
                    </p>
                )}

                <form
                    action={forgotPasswordAction}
                    className="space-y-4"
                >
                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Send Reset Link
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign In
                    </Link>
                </p>
            </div>
        </main>
    );
}