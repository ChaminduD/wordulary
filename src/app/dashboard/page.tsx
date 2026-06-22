import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: terms } =
        await supabase
            .from("terms")
            .select("status")
            .eq("user_id", user?.id);

    const { count: collectionsCount } =
        await supabase
            .from("collections")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

    const totalTerms = terms?.length ?? 0;

    const newTerms = terms?.filter((term) => term.status === "new").length ?? 0;

    const learningTerms = terms?.filter((term) => term.status === "learning").length ?? 0;

    const masteredTerms = terms?.filter((term) => term.status === "mastered").length ?? 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-semibold">
                    Vocabulary Overview
                </h2>

                <p className="text-muted-foreground">
                    Track your learning progress.
                </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
                <div className="rounded-lg border p-6">
                    <p className="text-sm text-muted-foreground">
                        Total Terms
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {totalTerms}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <p className="text-sm text-muted-foreground">
                        New
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {newTerms}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <p className="text-sm text-muted-foreground">
                        Learning
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {learningTerms}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <p className="text-sm text-muted-foreground">
                        Mastered
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {masteredTerms}
                    </p>
                </div>

                <div className="rounded-lg border p-6">
                    <p className="text-sm text-muted-foreground">
                        Collections
                    </p>

                    <p className="mt-2 text-3xl font-bold">
                        {collectionsCount}
                    </p>
                </div>
            </div>
        </div>
    );
}