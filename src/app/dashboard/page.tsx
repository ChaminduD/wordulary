import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/sign-out-button";

export default async function DashboardPage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    return (
        <main className="p-8">
            <h1 className="text-3xl font-bold">
                Welcome, {user.user_metadata.full_name}
            </h1>

            <p className="mt-4">
                Your dashboard is protected.
            </p>

            <div className="mt-6">
                <SignOutButton />
            </div>
        </main>
    );
}