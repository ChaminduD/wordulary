import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { generateTerm } from "@/lib/ai/generate-term";

type RouteContext = {
    params: Promise<{ id: string; }>;
};

export async function POST(
    request: Request,
    { params }: RouteContext
) {
    try {
        const { id } = await params;

        const supabase = await createClient();

        const { data: { user }, } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated", },
                { status: 401, }
            );
        }

        const {
            data: term,
            error: fetchError,
        } = await supabase
            .from("terms")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single();

        if (fetchError || !term) {
            return NextResponse.json(
                { error: "Term not found", },
                { status: 404, }
            );
        }

        const generated = await generateTerm(term.term);

        const { error: updateError } =
            await supabase
                .from("terms")
                .update({
                    term_type: generated.termType,

                    definition: generated.definition,

                    example_sentences: generated.exampleSentences,

                    synonyms: generated.synonyms,

                    antonyms: generated.antonyms,

                    difficulty: generated.difficulty,

                    ai_generated: true,
                })
                .eq("id", id);

        if (updateError) {
            throw updateError;
        }

        return NextResponse.json({ success: true, });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to generate AI content", },
            { status: 500, }
        );
    }
}