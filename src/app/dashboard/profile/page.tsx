import { createClient } from "@/lib/supabase/server";
import { SignOutButton } from "@/components/auth/sign-out-button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Profile",
};

export default async function ProfilePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const userName =
        user.user_metadata.full_name ??
        "User";

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Profile
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Manage your account.
                </p>
            </section>

            <section className="rounded-xl border p-6">
                <h2 className="text-lg font-semibold">
                    Account
                </h2>

                <div className="mt-6 space-y-4">
                    <div>
                        <p className="text-sm text-muted-foreground">
                            Name
                        </p>

                        <p className="font-medium">
                            {userName}
                        </p>
                    </div>

                    <div>
                        <p className="text-sm text-muted-foreground">
                            Email
                        </p>

                        <p className="font-medium">
                            {user.email}
                        </p>
                    </div>
                </div>
            </section>

            <section className="rounded-xl border p-6">
                <h2 className="text-lg font-semibold">
                    Sign Out
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Sign out of your Wordulary account.
                </p>

                <div className="mt-6">
                    <SignOutButton />
                </div>
            </section>
        </div>
    );
}