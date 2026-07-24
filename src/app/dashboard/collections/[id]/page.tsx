import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import type { Metadata } from "next";

type CollectionTerm = {
    id: string;
    term: string;
    term_type: string;
    status: string;
};

type PageProps = {
    params: Promise<{ id: string; }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { id } = await params;

    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return {
            title: "Collection",
        };
    }

    const { data: collection } = await supabase
        .from("collections")
        .select("name")
        .eq("id", id)
        .eq("user_id", user.id)
        .single();

    return {
        title: collection?.name ?? "Collection",
    };
}

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

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {collectionTerms?.map((collectionTerm) => {
                    const term = collectionTerm.terms as unknown as CollectionTerm;

                    if (!term) {
                        return null;
                    }

                    return (
                        <div
                            key={collectionTerm.term_id}
                            className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
                        >
                            <Link
                                href={`/dashboard/terms/${term.id}`}
                                className="block"
                            >
                                <h3 className="text-lg font-semibold hover:underline">
                                    {term.term}
                                </h3>

                                <div className="mt-3 flex flex-wrap gap-2">
                                    <Badge variant="outline" className="capitalize">
                                        {term.term_type.replaceAll("_", " ")}
                                    </Badge>

                                    <Badge variant="secondary" className="capitalize">
                                        {term.status}
                                    </Badge>
                                </div>
                            </Link>
                        </div>
                    );
                })}
            </section>
        </div>
    );
}