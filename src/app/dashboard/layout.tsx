import { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

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
        <>
            <DashboardSidebar userName={userName} />

            <main className="ml-64 min-h-screen p-6">
                {children}
            </main>
        </>
    );
}