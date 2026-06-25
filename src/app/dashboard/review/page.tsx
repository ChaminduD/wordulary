import { createClient } from "@/lib/supabase/server";
import { ReviewSession } from "@/components/review/review-session";
import { ReviewCollectionFilter } from "@/components/review/review-collection-filter";

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
            <div className="space-y-4">
                <h2 className="text-xl font-bold">
                    Review
                </h2>

                <ReviewCollectionFilter
                    collections={collections ?? []}
                    selectedCollectionId={collection}
                />

                <p className="text-muted-foreground">
                    No learning terms available.
                    <br />
                    Generate AI content and mark terms as Learning to start reviewing.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">
                Review
            </h2>

            <ReviewCollectionFilter
                collections={collections ?? []}
                selectedCollectionId={collection}
            />

            <ReviewSession
                terms={terms}
                collectionId={collection}
            />
        </div>
    );
}