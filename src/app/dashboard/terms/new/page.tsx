import { TermGenerator } from "@/components/terms/term-generator";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";

export default async function NewTermPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: collections } =
        await supabase
            .from("collections")
            .select("id, name")
            .eq("user_id", user.id)
            .order("name");

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold">
                    Add New Term
                </h2>

                <p className="text-muted-foreground">
                    Generate vocabulary content with AI.
                </p>
            </div>

            <TermGenerator
                collections={collections ?? []}
            />

            <div className="space-y-4">
                <p>Need to import multiple terms?</p>

                <Button variant="outline" asChild>
                    <Link href="/dashboard/terms/import">
                        Import Terms
                    </Link>
                </Button>
            </div>
        </div>
    );
}