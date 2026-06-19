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

        const message =
            error instanceof Error
                ? error.message
                : "Failed to generate AI content";

        if (message.includes("429")) {
            return NextResponse.json(
                { error: "AI quota reached. Please wait a minute and try again.", },
                { status: 429 }
            );
        }

        if (message.includes("503")) {
            return NextResponse.json(
                { error: "AI service is busy. Please try again shortly.", },
                { status: 503 }
            );
        }

        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}