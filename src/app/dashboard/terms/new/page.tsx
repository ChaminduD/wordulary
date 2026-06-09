import { TermGenerator } from "@/components/terms/term-generator";

export default function NewTermPage() {
    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-xl font-semibold">
                    Add New Term
                </h2>

                <p className="mt-2 text-muted-foreground">
                    Generate vocabulary content with AI.
                </p>
            </div>

            <TermGenerator />
        </div>
    );
}