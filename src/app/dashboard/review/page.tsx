import { createClient } from "@/lib/supabase/server";
import { ReviewSession } from "@/components/review/review-session";

export default async function ReviewPage() {
    const supabase = await createClient();

    const { data: { user }, } = await supabase.auth.getUser();

    if (!user) {
        throw new Error("User not authenticated");
    }

    const { data: terms, error, } =
        await supabase
            .from("terms")
            .select(`
                id,
                term,
                definition,
                example_sentences,
                status
            `)
            .eq("user_id", user.id)
            .eq("status", "learning")
            .eq("ai_generated", true);

    if (error) {
        throw error;
    }

    if (!terms?.length) {
        return (
            <div>
                <h2 className="text-xl font-bold">
                    Review
                </h2>

                <p className="text-muted-foreground">
                    No learning terms available.

                    Generate AI content and mark terms as Learning to start reviewing.
                </p>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold">
                Review
            </h2>

            <ReviewSession terms={terms} />
        </div>
    );
}