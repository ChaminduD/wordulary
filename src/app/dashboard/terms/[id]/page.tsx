import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

type PageProps = {
    params: Promise<{ id: string; }>;
};

export default async function TermPage({ params, }: PageProps) {
    const { id } = await params;

    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        notFound();
    }

    const { data: term, error } =
        await supabase
            .from("terms")
            .select("*")
            .eq("id", id)
            .eq("user_id", user.id)
            .single();

    if (error || !term) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    {term.term}
                </h1>

                <p className="text-muted-foreground">
                    {term.term_type}
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <p>
                    Status: {term.status}
                </p>

                <p>
                    AI Generated:{" "}
                    {term.ai_generated ? "Yes" : "No"}
                </p>
            </div>
        </div>
    );
}