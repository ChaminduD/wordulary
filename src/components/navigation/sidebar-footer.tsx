import { createClient } from "@/lib/supabase/server";
import { Separator } from "@/components/ui/separator";
import { AccountLink } from "@/components/navigation/account-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { SignOutButton } from "@/components/auth/sign-out-button";

export async function SidebarFooter() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return null;
    }

    const userName = user.user_metadata.full_name ?? "User";

    return (
        <div className="mt-auto">
            <Separator />

            <div className="py-4">
                <ThemeToggle variant="sidebar" />
            </div>

            <Separator />

            <div className="pt-4">
                <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {userName.charAt(0).toUpperCase()}
                    </div>

                    <div className="min-w-0">
                        <p className="truncate text-sm font-medium">
                            {userName}
                        </p>
                    </div>
                </div>

                <div className="space-y-2">
                    <AccountLink
                        href="/dashboard/profile"
                        label="Profile"
                    />

                    <SignOutButton variant="sidebar" />
                </div>
            </div>
        </div>
    );
}