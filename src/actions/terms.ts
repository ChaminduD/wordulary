"use server";

import { generateTerm } from "@/lib/ai/generate-term";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { GeneratedTerm } from "@/types/term";

export async function generateTermAction(term: string) {
    return generateTerm(term);
}

export async function saveTermAction(generatedTerm: GeneratedTerm) {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { error } = await supabase
        .from("terms")
        .insert({
            user_id: user.id,

            term: generatedTerm.term,

            term_type: generatedTerm.termType,

            definition: generatedTerm.definition,

            example_sentences: generatedTerm.exampleSentences,

            synonyms: generatedTerm.synonyms,

            antonyms: generatedTerm.antonyms,

            difficulty: generatedTerm.difficulty,

            status: "new",
        });

    if (error) {
        throw error;
    }

    revalidatePath("/dashboard/terms");
}