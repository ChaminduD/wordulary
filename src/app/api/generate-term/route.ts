import { NextResponse } from "next/server";
import { generateTerm } from "@/lib/ai/generate-term";

export async function POST(
    request: Request
) {
    try {
        const body = await request.json();

        const term = body.term;

        if (typeof term !== "string" || !term.trim()) {
            return NextResponse.json(
                {error: "Term is required",},
                {status: 400,}
            );
        }

        const generatedTerm = await generateTerm(term);

        return NextResponse.json(generatedTerm);

    } catch (error) {
        console.error(error);

        return NextResponse.json(
            {error: "Failed to generate term",},
            {status: 500,}
        );
    }
}