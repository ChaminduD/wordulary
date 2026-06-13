import { createClient } from "@/lib/supabase/server";
import { TermsTable } from "@/components/terms/terms-table";
import { TermsSearch } from "@/components/terms/terms-search";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{ search?: string; }>;
};

export default async function TermsPage({ searchParams, }: PageProps) {
    const { search } = await searchParams;

    const hasSearch = Boolean(search?.trim());

    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    let query = supabase
        .from("terms")
        .select(`
          id,
          term,
          term_type,
          ai_generated,
          created_at
        `)
        .eq("user_id", user.id);

    if (search?.trim()) {
        query = query.ilike("term", `%${search.trim()}%`);
    }

    const { data: terms, error } = await query.order("created_at", { ascending: false, });

    if (error) {
        throw error;
    }

    const termListItems =
        terms.map((term) => ({
            id: term.id,
            term: term.term,
            termType: term.term_type,
            aiGenerated: term.ai_generated,
            createdAt: term.created_at,
        }));

    return (
        <div className="space-y-6">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">
                        Your Terms
                    </h1>

                    <p className="text-muted-foreground">
                        Manage and study your vocabulary.
                    </p>
                </div>

                <div className="flex gap-2">
                    <Link
                        href="/dashboard/terms/new"
                        className="rounded border px-4 py-2"
                    >
                        Add Term
                    </Link>

                    <Link
                        href="/dashboard/terms/import"
                        className="rounded border px-4 py-2"
                    >
                        Import Terms
                    </Link>
                </div>
            </div>

            <TermsSearch />

            <p>
                Showing {termListItems.length} {termListItems.length === 1 ? "term" : "terms"}
            </p>

            <TermsTable terms={termListItems} hasSearch={hasSearch} />
        </div>
    );
}