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

export default async function CollectionPage({ params }: PageProps) {
    const supabase = await createClient();

    const { id } = await params;

    const { data: collection, error } =
        await supabase
            .from("collections")
            .select("*")
            .eq("id", id)
            .single();

    if (error || !collection) {
        notFound();
    }

    const { data: collectionTerms, error: collectionTermsError } =
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
            <div className="space-y-8">
                <section>
                    <h1 className="text-3xl font-semibold tracking-tight">
                        {collection.name}
                    </h1>

                    <p className="mt-1 text-sm text-muted-foreground">
                        0 terms
                    </p>
                </section>

                <section className="rounded-xl border p-8 text-center">
                    <h2 className="font-semibold">
                        No terms yet
                    </h2>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Add terms to this collection from the Term Details page.
                    </p>
                </section>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    {collection.name}
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    {totalTerms} {totalTerms === 1 ? "term" : "terms"}
                </p>
            </section>

            <section className="space-y-3">
                {collectionTerms?.map((collectionTerm) => {
                    const term = collectionTerm.terms as unknown as CollectionTerm;

                    if (!term) {
                        return null;
                    }

                    return (
                        <div
                            key={collectionTerm.term_id}
                            className="rounded-xl border p-4"
                        >
                            <Link
                                href={`/dashboard/terms/${term.id}`}
                                className="font-medium hover:underline"
                            >
                                {term.term}
                            </Link>

                            <div className="mt-2 space-y-1">
                                <p className="text-sm text-muted-foreground capitalize">
                                    {term.term_type.replaceAll("_", " ")}
                                </p>

                                <p className="text-sm capitalize">
                                    {term.status}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}