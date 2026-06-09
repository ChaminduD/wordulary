import type { Difficulty, TermType, } from "./term";

export type Term = {
    id: string;

    userId: string;

    term: string;

    termType: TermType;

    definition: string;

    exampleSentences: string[];

    synonyms: string[];

    antonyms: string[];

    difficulty: Difficulty;

    status:
    | "new"
    | "learning"
    | "mastered";

    personalNote: string | null;

    createdAt: string;

    updatedAt: string;
};