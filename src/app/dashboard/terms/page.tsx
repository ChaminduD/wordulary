import { createClient } from "@/lib/supabase/server";
import { TermsTable } from "@/components/terms/terms-table";

export default async function TermsPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: terms, error } =
        await supabase
            .from("terms")
            .select(`
              id,
              term,
              term_type,
              ai_generated,
              created_at
            `)
            .eq("user_id", user.id)
            .order("created_at", {
                ascending: false,
            });

    if (error) {
        throw error;
    }

    const termListItems =
        terms.map((term) => ({
            id: term.id,
            term: term.term,
            termType: term.term_type,
            aiGenerated:
                term.ai_generated,
            createdAt:
                term.created_at,
        }));

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Your Terms
                </h1>

                <p className="text-muted-foreground">
                    Manage and study your vocabulary.
                </p>
            </div>

            <div>
                <p>Total Terms: {termListItems.length}</p>
            </div>

            <TermsTable terms={termListItems} />
        </div>
    );
}