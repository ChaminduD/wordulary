import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/branding/logo";

export default function SignUpSuccessPage() {
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
            </div>
        </main>
    );
}