import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function SignUpSuccessPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border p-6 text-center">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Check Your Email
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        We&apos;ve sent you a verification email. Please verify your email address before signing in.
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