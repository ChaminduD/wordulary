import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

type RouteContext = {
    params: Promise<{ id: string; }>;
};

export async function PATCH(request: Request, { params }: RouteContext) {
    try {
        const { id } = await params;

        const body = await request.json();

        const status = body.status;

        const allowedStatuses = ["new", "learning", "mastered"];

        if (!allowedStatuses.includes(status)) {
            return NextResponse.json(
                { error: "Invalid status", },
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

        const {
            data: term,
            error: termError,
        } = await supabase
            .from("terms")
            .select("ai_generated")
            .eq("id", id)
            .eq("user_id", user.id)
            .single();

        if (termError || !term) {
            return NextResponse.json(
                { error: "Term not found" },
                { status: 404 }
            );
        }

        if (!term.ai_generated && status !== "new") {
            return NextResponse.json(
                { error: "Generate AI content before changing the status." },
                { status: 400 }
            );
        }

        const { error } = await supabase
            .from("terms")
            .update({ status, })
            .eq("id", id)
            .eq("user_id", user.id);

        if (error) {
            throw error;
        }

        return NextResponse.json({ success: true, });
    } catch (error) {
        console.error(error);

        return NextResponse.json(
            { error: "Failed to update status", },
            { status: 500, }
        );
    }
}