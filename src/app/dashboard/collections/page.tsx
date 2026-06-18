import { deleteCollection } from "@/actions/collections";
import { CreateCollectionForm } from "@/components/collections/create-collection-form";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

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

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">
                Collections
            </h2>

            <CreateCollectionForm />

            <div className="space-y-2">
                {collections?.map((collection) => (
                    <div
                        key={collection.id}
                        className="flex items-center justify-between rounded border p-3"
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

                            <button
                                type="submit"
                                className="text-sm"
                            >
                                Delete
                            </button>
                        </form>
                    </div>
                ))}

                {collections?.length === 0 && (
                    <div className="rounded-lg border p-8 text-center">
                        <h3 className="font-semibold">
                            No collections yet
                        </h3>

                        <p className="mt-2 text-sm text-muted-foreground">
                            Create your first collection
                            to organize your vocabulary.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}