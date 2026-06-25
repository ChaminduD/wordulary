import { redirect } from "next/navigation";
import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";

type PageProps = {
  searchParams: Promise<{
    error?: string;
  }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { error } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-lg border p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Wordulary</h1>
          <p className="mt-2 text-muted-foreground">
            Learn vocabulary smarter with AI
          </p>
        </div>

        <GoogleSignInButton />

        <p className="text-center text-sm text-muted-foreground">
          or
        </p>

        {error === "invalid_credentials" && (
          <p className="text-center text-sm text-red-500">
            Invalid email or password.
          </p>
        )}

        {error === "email_not_confirmed" && (
          <p className="text-center text-sm text-red-500">
            Please verify your email before signing in.
          </p>
        )}

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

          <Button
            type="submit"
            className="w-full"
          >
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}