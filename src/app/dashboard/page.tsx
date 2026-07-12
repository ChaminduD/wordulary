import { createClient } from "@/lib/supabase/server";
import { ProgressCard } from "@/components/dashboard/progress-card";
import { DashboardHero } from "@/components/dashboard/dashboard-hero";
import { getDashboardHero } from "@/lib/dashboard";
import { RecentTerms } from "@/components/dashboard/recent-terms";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard",
};

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: terms } =
        await supabase
            .from("terms")
            .select("status, ai_generated")
            .eq("user_id", user.id);

    const { count: collectionsCount } =
        await supabase
            .from("collections")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

    const { data: recentTerms } =
        await supabase
            .from("terms")
            .select(`id, term, status`)
            .eq("user_id", user.id)
            .order("created_at", { ascending: false })
            .limit(5);

    const totalTerms = terms?.length ?? 0;

    const learningTerms = terms?.filter((term) => term.status === "learning").length ?? 0;

    const masteredTerms = terms?.filter((term) => term.status === "mastered").length ?? 0;

    const missingAiTerms = terms?.filter((term) => !term.ai_generated).length ?? 0;

    const hero = getDashboardHero({
        totalTerms,
        learningTerms,
        masteredTerms,
        missingAiTerms,
    });

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Welcome back
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Continue building your vocabulary.
                </p>
            </section>

            <DashboardHero {...hero} />

            <section className="space-y-4">
                <h2 className="text-lg font-semibold">
                    Your Progress
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    <ProgressCard
                        value={totalTerms}
                        label="Total Terms"
                    />

                    <ProgressCard
                        value={learningTerms}
                        label="Learning"
                    />

                    <ProgressCard
                        value={masteredTerms}
                        label="Mastered"
                    />

                    <ProgressCard
                        value={collectionsCount ?? 0}
                        label="Collections"
                    />
                </div>
            </section>

            <RecentTerms terms={recentTerms ?? []} />
        </div>
    );
}