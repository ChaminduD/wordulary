"use server";

import { generateTerm } from "@/lib/ai/generate-term";

export async function generateTermAction(term: string) {
    return generateTerm(term);
}