import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const supabase = await createClient();

        const { data: { user }, } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated", },
                { status: 401, }
            );
        }

        const { error } =
            await supabase
                .from("terms")
                .insert({
                    user_id: user.id,

                    term: body.term,

                    term_type: body.termType,

                    definition: body.definition,

                    example_sentences: body.exampleSentences,

                    synonyms: body.synonyms,

                    antonyms: body.antonyms,

                    difficulty: body.difficulty,

                    ai_generated: true,

                    status: "new",
                });

        if (error) {
            if (error.code === "23505") {
                return NextResponse.json(
                    { error: "This term already exists in your vocabulary.", },
                    { status: 409, }
                );
            }

            throw error;
        }

        return NextResponse.json({ success: true, });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to save term", },
            { status: 500, }
        );
    }
}