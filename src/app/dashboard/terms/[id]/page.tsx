import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { GenerateAiContentButton } from "@/components/terms/generate-ai-content-button";
import { StatusSelector } from "@/components/terms/status-selector";
import { CollectionSelector } from "@/components/collections/collection-selector";
import { deleteTermAction } from "@/actions/terms";
import { ConfirmDeleteButton } from "@/components/terms/confirm-delete-button";

type PageProps = {
    params: Promise<{ id: string; }>;
};

export default async function TermPage({ params, }: PageProps) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        notFound();
    }

    const { data: term, error } =
        await supabase
            .from("terms")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single();

    if (error || !term) {
        notFound();
    }

    const { data: collections, } =
        await supabase
            .from("collections")
            .select("id, name")
            .order("name");

    const { data: assignedCollections, } =
        await supabase
            .from("term_collections")
            .select("collection_id")
            .eq("term_id", term.id);

    const selectedCollectionIds = assignedCollections?.map((item) => item.collection_id) ?? [];

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {term.term}
                </h1>

                <p className="text-muted-foreground">
                    {term.term_type}
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <div className="mb-4 border-b-2 pb-2">
                    <StatusSelector
                        termId={term.id}
                        status={term.status}
                        aiGenerated={term.ai_generated}
                    />
                </div>

                <div className="mb-4 border-b-2 pb-2">
                    <CollectionSelector
                        termId={term.id}
                        collections={collections ?? []}
                        selectedCollectionIds={selectedCollectionIds}
                    />
                </div>

                <h2 className="mb-4 font-semibold">
                    AI Content
                </h2>

                {!term.ai_generated ? (
                    <div className="space-y-4">
                        <p>
                            Not generated yet.
                        </p>

                        <GenerateAiContentButton termId={term.id} />
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <h3 className="font-medium">
                                Definition
                            </h3>

                            <p className="mt-2">
                                {term.definition}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">
                                Examples
                            </h3>

                            <ul className="mt-2 list-disc pl-5">
                                {term.example_sentences?.map(
                                    (
                                        example: string,
                                        index: number
                                    ) => (
                                        <li key={index}>{example}</li>
                                    )
                                )}
                            </ul>
                        </div>

                        <div>
                            <h3 className="font-medium">
                                Synonyms
                            </h3>

                            <p className="mt-2">
                                {term.synonyms?.join(", ")}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">
                                Antonyms
                            </h3>

                            <p className="mt-2">
                                {term.antonyms?.join(", ")}
                            </p>
                        </div>

                        <div>
                            <h3 className="font-medium">
                                Difficulty
                            </h3>

                            <p className="mt-2 capitalize">
                                {term.difficulty}
                            </p>
                        </div>
                    </div>
                )}
            </div>
            <div className="rounded-lg border p-6">
                <h2 className="font-semibold">
                    Danger Zone
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Permanently delete this term.
                </p>

                <form
                    action={deleteTermAction}
                    className="mt-4"
                >
                    <input
                        type="hidden"
                        name="id"
                        value={term.id}
                    />

                    <ConfirmDeleteButton
                        label="Delete Term"
                        termName={term.term}
                    />
                </form>
            </div>
        </div>
    );
}