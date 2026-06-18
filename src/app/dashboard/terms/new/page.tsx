import { TermGenerator } from "@/components/terms/term-generator";
import Link from "next/link";

export default function NewTermPage() {
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

            <TermGenerator />

            <div className="space-y-4">
                <p>Need to import multiple terms?</p>

                <Link
                    href="/dashboard/terms/import"
                    className="rounded border px-4 py-2"
                >
                    Import Terms
                </Link>
            </div>
        </div>
    );
}