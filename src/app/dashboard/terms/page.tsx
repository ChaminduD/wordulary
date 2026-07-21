import { createClient } from "@/lib/supabase/server";
import { TermsTable } from "@/components/terms/terms-table";
import { TermsSearch } from "@/components/terms/terms-search";
import { TermsFilters } from "@/components/terms/terms-filters";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Vocabulary",
};

type PageProps = {
    searchParams: Promise<{
        search?: string;
        status?: string;
        ai?: string;
    }>;
};

export default async function TermsPage({ searchParams }: PageProps) {
    const { search, status, ai } = await searchParams;

    const hasSearch = Boolean(search?.trim());

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    let query = supabase
        .from("terms")
        .select(`
          id,
          term,
          term_type,
          status,
          ai_generated,
          created_at
        `)
        .eq("user_id", user.id);

    if (search?.trim()) {
        query = query.ilike("term", `%${search.trim()}%`);
    }

    if (status && ["new", "learning", "mastered"].includes(status)) {
        query = query.eq("status", status);
    }

    if (ai === "generated") {
        query = query.eq("ai_generated", true);
    }

    if (ai === "missing") {
        query = query.eq("ai_generated", false);
    }

    const { data: terms, error } = await query.order("created_at", { ascending: false });

    if (error) {
        throw error;
    }

    const termListItems =
        terms.map((term) => ({
            id: term.id,
            term: term.term,
            termType: term.term_type,
            status: term.status,
            aiGenerated: term.ai_generated,
            createdAt: term.created_at,
        }));

    const { count: totalTerms } =
        await supabase
            .from("terms")
            .select("*", {
                count: "exact",
                head: true,
            })
            .eq("user_id", user.id);

    const hasTerms = (totalTerms ?? 0) > 0;

    const searchQuery = search?.trim() ?? "";

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Your Terms
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Manage and study your vocabulary.
                    </p>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button asChild>
                        <Link href="/dashboard/terms/new">
                            Add New Term
                        </Link>
                    </Button>

                    <Button variant="outline" asChild>
                        <Link href="/dashboard/terms/import">
                            Import Terms
                        </Link>
                    </Button>
                </div>
            </div>

            <div className="rounded-xl border p-6 space-y-6">
                <TermsSearch />

                <TermsFilters
                    hasTerms={hasTerms}
                    status={status ?? ""}
                    ai={ai ?? ""}
                    searchQuery={searchQuery}
                    resultCount={termListItems.length}
                />
            </div>

            <TermsTable
                terms={termListItems}
                hasSearch={hasSearch}
                hasActiveFilter={Boolean(status || ai)}
            />
        </div>
    );
}