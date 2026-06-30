import { ImportTermsForm } from "@/components/terms/import-terms-form";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function ImportTermsPage() {
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
                    Import Terms
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Paste your vocabulary list and import multiple terms at once.
                </p>
            </section>

            <ImportTermsForm
                collections={collections ?? []}
            />

            <section className="rounded-xl border p-6">
                <h2 className="text-lg font-semibold">
                    Add Individual Terms
                </h2>

                <p className="mt-1 text-sm text-muted-foreground">
                    Generate AI definitions, examples, synonyms and more for a single term.
                </p>

                <Button
                    variant="outline"
                    asChild
                    className="mt-4"
                >
                    <Link href="/dashboard/terms/new">
                        Add New Term
                    </Link>
                </Button>
            </section>
        </div>
    );
}