import Link from "next/link";
import { signUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { Separator } from "@/components/ui/separator";

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 rounded-xl border p-6">
                <div className="text-center">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Wordulary
                    </h1>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Create your account
                    </p>
                </div>

                <GoogleAuthButton />

                <div className="relative">
                    <Separator />

                    <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
                        or
                    </span>
                </div>

                <form
                    action={signUpAction}
                    className="space-y-4"
                >
                    <Input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                    />

                    <Input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />

                    <Input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                    />

                    <Button
                        type="submit"
                        className="w-full"
                    >
                        Create Account
                    </Button>
                </form>

                <p className="text-center text-sm text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-medium text-primary hover:underline"
                    >
                        Sign in
                    </Link>
                </p>
            </div>
        </main>
    );
}