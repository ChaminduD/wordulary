"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function forgotPasswordAction(formData: FormData) {
    const supabase = await createClient();

    const email = formData.get("email") as string;

    const { error } =
        await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/reset-password`,
        });

    if (error) {
        redirect("/forgot-password?error=reset_failed");
    }

    redirect("/forgot-password?success=sent");
}