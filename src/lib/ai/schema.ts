import { z } from "zod";

export const generatedTermSchema = z.object({
    term: z.string(),

    termType: z.enum([
        "word",
        "phrase",
        "idiom",
        "phrasal_verb",
        "expression",
    ]),

    definition: z.string(),

    exampleSentences: z
        .array(z.string())
        .length(3),

    synonyms: z
        .array(z.string())
        .length(3),

    antonyms: z
        .array(z.string())
        .length(3),

    difficulty: z.enum([
        "beginner",
        "intermediate",
        "advanced",
    ]),
});