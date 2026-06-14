import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

type CollectionTerm = {
    id: string;
    term: string;
    term_type: string;
    status: string;
};

type PageProps = {
    params: Promise<{ id: string; }>;
};

export default async function CollectionPage({ params, }: PageProps) {
    const supabase = await createClient();

    const { id } = await params;

    const { data: collection, error, } =
        await supabase
            .from("collections")
            .select("*")
            .eq("id", id)
            .single();

    if (error || !collection) {
        notFound();
    }

    const { data: collectionTerms, error: collectionTermsError, } =
        await supabase
            .from("term_collections")
            .select(`
                term_id,
                terms (
                    id,
                    term,
                    term_type,
                    status
                )
            `)
            .eq("collection_id", id);

    if (collectionTermsError) {
        console.error(collectionTermsError);
    }

    const totalTerms = collectionTerms?.length ?? 0;

    if (totalTerms === 0) {
        return (
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                    {collection.name}
                </h2>

                <p className="text-muted-foreground">
                    No terms in this collection yet.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-2">
                <h2 className="text-xl font-semibold">
                    {collection.name}
                </h2>
                <p className="text-muted-foreground">
                    {totalTerms} terms
                </p>
            </div>

            <div className="space-y-3">
                {collectionTerms?.map((collectionTerm) => {
                    const term = collectionTerm.terms as unknown as CollectionTerm;

                    if (!term) {
                        return null;
                    }

                    return (
                        <div
                            key={collectionTerm.term_id}
                            className="rounded border p-3"
                        >
                            <Link
                                href={`/dashboard/terms/${term.id}`}
                                className="font-medium hover:underline"
                            >
                                {term.term}
                            </Link>

                            <p className="text-sm text-muted-foreground capitalize">
                                {term.term_type.replaceAll("_", " ")}
                            </p>

                            <p className="mt-2 text-sm capitalize">
                                {term.status}
                            </p>
                        </div>
                    );
                })}
            </div>
        </>
    );
}