import Link from "next/link";
import { signUpAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen items-center justify-center p-4">
            <div className="w-full max-w-sm space-y-6 rounded-lg border p-6">

                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Wordulary
                    </h1>

                    <p className="mt-2 text-center text-muted-foreground">
                        Create your account
                    </p>
                </div>

                <form
                    action={signUpAction}
                    className="space-y-4"
                >
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        required
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        className="w-full rounded border px-3 py-2"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        required
                        className="w-full rounded border px-3 py-2"
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
                        className="font-medium hover:underline"
                    >
                        Sign in
                    </Link>
                </p>

            </div>
        </main>
    );
}