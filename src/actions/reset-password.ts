"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/lib/supabase/server";

export async function resetPasswordAction(formData: FormData) {
    const supabase = await createClient();

    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirmPassword") as string;

    if (password !== confirmPassword) {
        redirect("/reset-password?error=password_mismatch");
    }

    const { error } = await supabase.auth.updateUser({
        password,
    });

    if (error) {
        redirect("/reset-password?error=update_failed");
    }

    await supabase.auth.signOut();

    redirect("/login?success=password_updated");
}