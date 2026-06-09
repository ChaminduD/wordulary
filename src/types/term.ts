export type Difficulty =
    | "beginner"
    | "intermediate"
    | "advanced";

export type TermType =
    | "word"
    | "phrase"
    | "idiom"
    | "phrasal_verb"
    | "expression";

export type GeneratedTerm = {
    term: string;

    termType: TermType;

    definition: string;

    exampleSentences: string[];

    synonyms: string[];

    antonyms: string[];

    difficulty: Difficulty;
};