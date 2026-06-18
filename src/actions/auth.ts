"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function signInAction(formData: FormData) {
    const email = formData.get("email");
    const password = formData.get("password");

    if (typeof email !== "string" || typeof password !== "string") {
        return;
    }

    const supabase = await createClient();

    const { error } =
        await supabase.auth.signInWithPassword({
            email,
            password,
        });

    if (error) {
        console.error(error);
        return;
    }

    redirect("/dashboard");
}

export async function signUpAction(formData: FormData) {
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    if (
        typeof name !== "string" ||
        !name.trim() ||
        typeof email !== "string" ||
        typeof password !== "string"
    ) {
        return;
    }

    const supabase = await createClient();

    const { error } =
        await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name.trim(),
                },
                emailRedirectTo:
                    `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
            },
        });

    if (error) {
        console.error(error);
        return;
    }

    redirect("/sign-up/success");
}