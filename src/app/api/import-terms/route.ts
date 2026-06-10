import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
    try {
        const body = await request.json();

        const terms = body.terms;

        if (!Array.isArray(terms) || terms.length === 0) {
            return NextResponse.json(
                { error: "At least one term is required", },
                { status: 400, }
            );
        }

        const supabase = await createClient();

        const { data: { user }, } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json(
                { error: "User not authenticated", },
                { status: 401, }
            );
        }

        const rows = terms.map((term: string) => ({
            user_id: user.id,
            term,
        })
        );

        const { error } = await supabase.from("terms").insert(rows);

        if (error) {
            throw error;
        }

        return NextResponse.json({ imported: rows.length, });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to import terms", },
            { status: 500, }
        );
    }
}