import { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

type DashboardLayoutProps = {
    children: ReactNode;
};

export default async function DashboardLayout({
    children,
}: DashboardLayoutProps) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        redirect("/login");
    }

    const userName =
        user.user_metadata.full_name ??
        user.email ??
        "User";

    return (
        <div className="min-h-screen">
            <DashboardHeader userName={userName} />

            <div className="flex">
                <DashboardSidebar />

                <main className="flex-1 p-6">
                    {children}
                </main>
            </div>
        </div>
    );
}