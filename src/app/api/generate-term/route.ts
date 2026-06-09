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
                { error: "Term is required", },
                { status: 400, }
            );
        }

        const generatedTerm = await generateTerm(term);

        return NextResponse.json(generatedTerm);

    } catch (error) {
        console.error("Generate term error:", error);

        const message = error instanceof Error ? error.message : "Failed to generate term";

        if (message.includes("429")) {
            return NextResponse.json(
                { error: "AI quota reached. Please wait a minute and try again.", },
                { status: 429, }
            );
        }

        if (message.includes("503")) {
            return NextResponse.json(
                { error: "AI service is busy. Please try again shortly.", },
                { status: 503, }
            );
        }

        return NextResponse.json(
            { error: message, },
            { status: 500, }
        );
    }
}