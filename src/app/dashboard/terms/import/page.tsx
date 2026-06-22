import { ImportTermsForm } from "@/components/terms/import-terms-form";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

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
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">
                    Import Terms
                </h2>

                <p className="text-muted-foreground">
                    Paste your terms and import them into Wordulary.
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <ImportTermsForm
                    collections={collections ?? []}
                />
            </div>

            <div className="space-y-4">
                <p>Need AI-generated definitions and examples?</p>

                <Link
                    href="/dashboard/terms/new"
                    className="rounded border px-4 py-2"
                >
                    Add Term
                </Link>
            </div>
        </div>
    );
}