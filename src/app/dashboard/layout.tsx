import { ReactNode } from "react";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

import { DashboardSidebar } from "@/components/navigation/dashboard-sidebar";
import { MobileBottomNav } from "@/components/navigation/mobile-bottom-nav";

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

    return (
        <>
            <DashboardSidebar />

            <main className="min-h-screen p-6 pb-24 md:ml-64 md:pb-6">
                {children}
            </main>

            <MobileBottomNav />
        </>
    );
}