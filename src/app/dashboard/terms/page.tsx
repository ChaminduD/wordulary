import { createClient } from "@/lib/supabase/server";
import { TermsTable } from "@/components/terms/terms-table";
import { TermsSearch } from "@/components/terms/terms-search";
import Link from "next/link";

type PageProps = {
    searchParams: Promise<{
        search?: string;
        status?: string;
        ai?: string;
    }>;
};

export default async function TermsPage({ searchParams, }: PageProps) {
    const { search, status, ai } = await searchParams;

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

    const { data: terms, error } = await query.order("created_at", { ascending: false, });

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

    const activeStatus = status ?? "";

    function getFilterClass(value: string) {
        return activeStatus === value
            ? "rounded border px-3 py-1 border-primary"
            : "rounded border px-3 py-1";
    }

    const searchQuery = search?.trim() ?? "";

    function getFilterHref(
        nextStatus?: string,
        nextAi?: string
    ) {
        const params = new URLSearchParams();

        if (searchQuery) {
            params.set(
                "search",
                searchQuery
            );
        }

        if (nextStatus) {
            params.set(
                "status",
                nextStatus
            );
        }

        if (nextAi) {
            params.set("ai", nextAi);
        }

        const query = params.toString();

        return query
            ? `/dashboard/terms?${query}`
            : "/dashboard/terms";
    }

    return (
        <div className="space-y-4">
            <div className="flex items-start justify-between gap-4">
                <div>
                    <h2 className="text-xl font-bold">
                        Your Terms
                    </h2>

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

            {hasTerms && (
                <>
                    <div className="flex gap-2">
                        <Link
                            href={
                                status === "new"
                                    ? getFilterHref(undefined, ai)
                                    : getFilterHref("new", ai)
                            }
                            className={getFilterClass("new")}

                        >
                            {status === "new"
                                ? "New ✓"
                                : "New"}
                        </Link>

                        <Link
                            href={
                                status === "learning"
                                    ? getFilterHref(undefined, ai)
                                    : getFilterHref("learning", ai)
                            }
                            className={getFilterClass("learning")}
                        >
                            {status === "learning"
                                ? "Learning ✓"
                                : "Learning"}
                        </Link>

                        <Link
                            href={
                                status === "mastered"
                                    ? getFilterHref(undefined, ai)
                                    : getFilterHref("mastered", ai)
                            }
                            className={getFilterClass("mastered")}
                        >
                            {status === "mastered"
                                ? "Mastered ✓"
                                : "Mastered"}
                        </Link>
                    </div>

                    <div className="flex gap-2">
                        <Link
                            href={
                                ai === "generated"
                                    ? getFilterHref(status)
                                    : getFilterHref(status, "generated")
                            }
                            className={ai === "generated"
                                ? "rounded border px-3 py-1 border-primary"
                                : "rounded border px-3 py-1"}
                        >
                            {ai === "generated"
                                ? "Generated ✓"
                                : "Generated"}
                        </Link>

                        <Link
                            href={
                                ai === "missing"
                                    ? getFilterHref(status)
                                    : getFilterHref(status, "missing")
                            }
                            className={ai === "missing"
                                ? "rounded border px-3 py-1 border-primary"
                                : "rounded border px-3 py-1"}
                        >
                            {ai === "missing"
                                ? "Missing AI ✓"
                                : "Missing AI"}
                        </Link>
                    </div>

                    {(status || ai) && (
                        <Link
                            href={
                                searchQuery
                                    ? `/dashboard/terms?search=${encodeURIComponent(searchQuery)}`
                                    : "/dashboard/terms"
                            }
                            className="rounded border px-3 py-1"
                        >
                            Clear Filters
                        </Link>
                    )}

                    <TermsSearch />

                    {termListItems.length > 0 && (
                        <p>
                            Showing {termListItems.length} {termListItems.length === 1 ? "term" : "terms"}
                        </p>
                    )}
                </>
            )}

            <TermsTable
                terms={termListItems}
                hasSearch={hasSearch}
                hasActiveFilter={Boolean(status || ai)}
            />
        </div>
    );
}