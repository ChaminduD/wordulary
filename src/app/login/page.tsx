import { redirect } from "next/navigation";
import { GoogleAuthButton } from "@/components/auth/google-auth-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { signInAction } from "@/actions/auth";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/branding/logo";
import type { Metadata } from "next";
import { SubmitButton } from "@/components/ui/submit-button";
import { ErrorMessage } from "@/components/ui/error-message";
import { SuccessMessage } from "@/components/ui/success-message";

export const metadata: Metadata = {
  title: "Sign In",
};

type PageProps = {
  searchParams: Promise<{
    error?: string;
    success?: string;
  }>;
};

export default async function LoginPage({ searchParams }: PageProps) {
  const { error, success } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm space-y-6 rounded-xl border p-8">
        <div className="space-y-3 text-center">
          <div className="flex justify-center">
            <Logo
              priority
              className="mx-auto"
            />
          </div>

          <p className="text-sm text-muted-foreground">
            Learn vocabulary smarter with AI.
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
          action={signInAction}
          className="space-y-4"
        >
          {error === "invalid_credentials" && (
            <ErrorMessage className="text-center">
              Invalid email or password.
            </ErrorMessage>
          )}

          {error === "email_not_confirmed" && (
            <ErrorMessage className="text-center">
              Please verify your email before signing in.
            </ErrorMessage>
          )}

          {success === "password_updated" && (
            <SuccessMessage className="text-center">
              Your password has been updated successfully. You can now sign in.
            </SuccessMessage>
          )}

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

          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <SubmitButton
            className="w-full"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
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