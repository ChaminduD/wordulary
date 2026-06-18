import Link from "next/link";
import { signUpAction } from "@/actions/auth";

export default function SignUpPage() {
    return (
        <main className="flex min-h-screen items-center justify-center">
            <div className="w-full max-w-sm space-y-6">

                <div className="text-center">
                    <h1 className="text-3xl font-bold">
                        Create Account
                    </h1>
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

                    <button
                        type="submit"
                        className="w-full rounded border px-4 py-2"
                    >
                        Create Account
                    </button>
                </form>

                <Link
                    href="/login"
                    className="block text-center text-sm"
                >
                    Already have an account?
                </Link>

            </div>
        </main>
    );
}