import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signInAction } from "@/actions/auth";

export default async function LoginPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Wordulary</h1>
          <p className="mt-2 text-muted-foreground">
            Learn vocabulary smarter with AI
          </p>
        </div>

        <GoogleSignInButton />

        <p>or</p>
        
        <form
          action={signInAction}
          className="space-y-4"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            className="w-full rounded border px-3 py-2"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="w-full rounded border px-3 py-2"
            required
          />

          <button
            type="submit"
            className="w-full rounded border px-4 py-2"
          >
            Sign In
          </button>
        </form>
        
        <p>Don&apos;t have an account?</p>

        <Link
          href="/sign-up"
          className="block text-center text-sm"
        >
          Create an account
        </Link>
      </div>
    </main>
  );
}