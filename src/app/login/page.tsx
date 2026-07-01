import { redirect } from "next/navigation";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signInAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";

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
      <div className="w-full max-w-sm space-y-6 rounded-xl border p-6">
        <div className="text-center">
          <h1 className="text-3xl font-semibold tracking-tight">
            Wordulary
          </h1>

          <p className="mt-2 text-sm text-muted-foreground">
            Build your vocabulary with AI
          </p>
        </div>

        <GoogleAuthButton />

        <div className="relative">
          <Separator />

          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-background px-2 text-sm text-muted-foreground">
            or
          </span>
        </div>

        {error === "invalid_credentials" && (
          <p className="text-center text-sm text-destructive">
            Invalid email or password.
          </p>
        )}

        {error === "email_not_confirmed" && (
          <p className="text-center text-sm text-destructive">
            Please verify your email before signing in.
          </p>
        )}

        <form
          action={signInAction}
          className="space-y-4"
        >
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
            Sign In
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-primary hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>
    </main>
  );
}