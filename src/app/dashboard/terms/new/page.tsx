import { TermGenerator } from "@/components/terms/term-generator";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function NewTermPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: collections } =
        await supabase
            .from("collections")
            .select("id, name")
            .eq("user_id", user.id)
            .order("name");

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Add New Term
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Generate vocabulary content with AI.
                </p>
            </section>

            <TermGenerator
                collections={collections ?? []}
            />

            <section className="rounded-xl border p-6">
                <h2 className="text-lg font-semibold">
                    Import Multiple Terms
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Already have a vocabulary list? Import multiple terms at once.
                </p>

                <Button
                    variant="outline"
                    asChild
                    className="mt-4"
                >
                    <Link href="/dashboard/terms/import">
                        Import Terms
                    </Link>
                </Button>
            </section>
        </div>
    );
}