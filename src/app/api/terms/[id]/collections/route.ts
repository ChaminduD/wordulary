import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
    params: Promise<{ id: string; }>;
};

export async function PATCH(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id: termId } = await params;

        const { collectionId, checked } = await request.json();

        const supabase = await createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated" },
                { status: 401 }
            );
        }

        if (checked) {
            const { error } =
                await supabase
                    .from("term_collections")
                    .insert({
                        term_id: termId,
                        collection_id: collectionId,
                    });

            if (error) {
                throw error;
            }
        } else {
            const { error } =
                await supabase
                    .from("term_collections")
                    .delete()
                    .eq("term_id", termId)
                    .eq("collection_id", collectionId);

            if (error) {
                throw error;
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to update collection" },
            { status: 500 }
        );
    }
}