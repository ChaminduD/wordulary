import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const terms = body.terms;
        const collectionIds = body.collectionIds;

        if (!Array.isArray(terms) || terms.length === 0) {
            return NextResponse.json(
                { error: "At least one term is required", },
                { status: 400, }
            );
        }

        const supabase = await createClient();

        const { data: { user }, } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated", },
                { status: 401, }
            );
        }

        const { data: existingTerms } =
            await supabase
                .from("terms")
                .select("term")
                .eq("user_id", user.id);

        const existing =
            new Set(
                existingTerms?.map(
                    (term) =>
                        term.term.toLowerCase()
                ) ?? []
            );

        const normalizedTerms =
            [...new Set(
                terms.map(
                    (term: string) =>
                        term.trim().toLowerCase()
                )
            )];

        const uniqueTerms =
            normalizedTerms.filter(
                (term) =>
                    !existing.has(term)
            );

        const rows = uniqueTerms.map(
            (term: string) => ({
                user_id: user.id,
                term,
            })
        );

        if (rows.length > 0) {
            const { data: createdTerms, error, } =
                await supabase
                    .from("terms")
                    .insert(rows)
                    .select("id");

            if (error) {
                throw error;
            }

            if (
                collectionIds?.length &&
                createdTerms?.length
            ) {
                const collectionLinks =
                    createdTerms.flatMap((term) =>
                        collectionIds.map(
                            (collectionId: string) => ({
                                term_id: term.id,
                                collection_id: collectionId,
                            })
                        )
                    );

                const { error: collectionError, } =
                    await supabase
                        .from("term_collections")
                        .insert(collectionLinks);

                if (collectionError) {
                    throw collectionError;
                }
            }
        }

        return NextResponse.json({
            imported: rows.length,
            skipped: terms.length - rows.length,
        });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to import terms", },
            { status: 500, }
        );
    }
}