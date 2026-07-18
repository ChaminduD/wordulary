import { deleteCollection } from "@/actions/collections";
import { CreateCollectionForm } from "@/components/collections/create-collection-form";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Collections",
};

export default async function CollectionsPage() {
    const supabase = await createClient();

    const {
        data: collections,
        error,
    } = await supabase
        .from("collections")
        .select("*")
        .order("created_at", {
            ascending: false,
        });

    if (error) {
        console.error(error);
    }

    const collectionList = collections ?? [];

    return (
        <div className="space-y-8">
            <section>
                <h1 className="text-3xl font-semibold tracking-tight">
                    Collections
                </h1>

                <p className="mt-1 text-sm text-muted-foreground">
                    Organize your vocabulary into collections.
                </p>
            </section>

            <CreateCollectionForm />

            <section className="space-y-3">
                <p className="text-sm text-muted-foreground">
                    {collectionList.length}{" "}
                    {collectionList.length === 1
                        ? "collection"
                        : "collections"}
                </p>

                {collectionList.map((collection) => (
                    <div
                        key={collection.id}
                        className="flex items-center justify-between rounded-xl border p-4"
                    >
                        <Link
                            href={`/dashboard/collections/${collection.id}`}
                            className="font-medium hover:underline"
                        >
                            {collection.name}
                        </Link>

                        <form action={deleteCollection}>
                            <input
                                type="hidden"
                                name="id"
                                value={collection.id}
                            />

                            <Button
                                type="submit"
                                variant="destructive"
                                size="sm"
                            >
                                Delete
                            </Button>
                        </form>
                    </div>
                ))}

                {collectionList.length === 0 && (
                    <div className="rounded-xl border p-8 text-center">
                        <h3 className="font-semibold">
                            No collections yet
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your first collection
                            to organize your vocabulary.
                        </p>
                    </div>
                )}
            </section>
        </div>
    );
}