import { createCollection, deleteCollection } from "@/actions/collections";
import { createClient } from "@/lib/supabase/server";

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

            <form
                action={createCollection}
                className="space-y-4"
            >
                <input
                    type="text"
                    name="name"
                    placeholder="Collection name"
                    className="rounded border px-3 py-2"
                />

                <button
                    type="submit"
                    className="rounded border px-4 py-2"
                >
                    Create Collection
                </button>
            </form>

            <div className="space-y-2">
                {collections?.map((collection) => (
                    <div
                        key={collection.id}
                        className="flex items-center justify-between rounded border p-3"
                    >
                        <span>{collection.name}</span>

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
            </div>
        </div>
    );
}