import { createClient } from "@/lib/supabase/server";
import { ReviewSession } from "@/components/review/review-session";
import { ReviewCollectionFilter } from "@/components/review/review-collection-filter";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Review",
};

type PageProps = {
    searchParams: Promise<{
        collection?: string;
    }>;
};

export default async function ReviewPage({ searchParams, }: PageProps) {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { collection } = await searchParams;

    let termIds: string[] = [];

    if (collection) {
        const {
            data: collectionTerms,
        } = await supabase
            .from("term_collections")
            .select("term_id")
            .eq("collection_id", collection);

        termIds =
            collectionTerms?.map(
                (item) => item.term_id
            ) ?? [];
    }

    let query = supabase
        .from("terms")
        .select(`
        id,
        term,
        definition,
        example_sentences,
        status
    `)
        .eq("user_id", user.id)
        .eq("status", "learning")
        .eq("ai_generated", true);

    if (collection) {
        query = query.in("id", termIds);
    }

    const { data: terms, error, } = await query;

    const { data: collections } =
        await supabase
            .from("collections")
            .select("id, name")
            .order("name");

    if (error) {
        throw error;
    }

    if (!terms?.length) {
        return (
            <div className="space-y-8">
                <section>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Review
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review your learning terms and strengthen your memory.
                    </p>
                </section>

                <section className="space-y-3">
                    <div>
                        <h2 className="text-lg font-semibold">
                            Collection
                        </h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            Review terms from all collections or focus on one collection.
                        </p>
                    </div>

                    <ReviewCollectionFilter
                        collections={collections ?? []}
                        selectedCollectionId={collection}
                    />
                </section>

                <section className="rounded-xl border p-8 text-center">
                    <h2 className="font-semibold">
                        Nothing to review
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        {collection
                            ? "This collection doesn't have any learning terms yet."
                            : "Generate AI content and move terms to Learning to start reviewing."}
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Review
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Review your learning terms and strengthen your memory.
                </p>
            </section>

            <section className="space-y-3">
                <div>
                    <h2 className="text-lg font-semibold">
                        Collection
                    </h2>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Review terms from all collections or focus on one collection.
                    </p>
                </div>

                <ReviewCollectionFilter
                    collections={collections ?? []}
                    selectedCollectionId={collection}
                />
            </section>

            <ReviewSession
                terms={terms}
                collectionId={collection}
            />
        </div>
    );
}