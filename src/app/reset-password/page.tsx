import { Logo } from "@/components/branding/logo";
import { Input } from "@/components/ui/input";
import { resetPasswordAction } from "@/actions/reset-password";
import type { Metadata } from "next";
import { SubmitButton } from "@/components/ui/submit-button";

export const metadata: Metadata = {
    title: "Reset Password",
};

type PageProps = {
    searchParams: Promise<{
        error?: string;
    }>;
};

export default async function ResetPasswordPage({ searchParams }: PageProps) {
    const { error } = await searchParams;

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
                            Create a new password
                        </h1>

                        <p className="text-sm text-muted-foreground">
                            Enter a new password for your account.
                        </p>
                    </div>
                </div>

                {error === "password_mismatch" && (
                    <p className="text-center text-sm text-destructive">
                        Passwords do not match.
                    </p>
                )}

                {error === "update_failed" && (
                    <p className="text-center text-sm text-destructive">
                        Unable to update your password. Please try again.
                    </p>
                )}

                {error === "same_password" && (
                    <p className="text-center text-sm text-destructive">
                        Your new password must be different from your current password.
                    </p>
                )}

                <form
                    action={resetPasswordAction}
                    className="space-y-4"
                >
                    <Input
                        type="password"
                        name="password"
                        placeholder="New password"
                        required
                    />

                    <Input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm new password"
                        required
                    />

                    <SubmitButton
                        className="w-full"
                        pendingText="Updating Password..."
                    >
                        Update Password
                    </SubmitButton>
                </form>
            </div>
        </main>
    );
}