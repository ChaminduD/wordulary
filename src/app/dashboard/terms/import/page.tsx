import { ImportTermsForm } from "@/components/terms/import-terms-form";
import Link from "next/link";

export default function ImportTermsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold">
                    Import Terms
                </h2>

                <p className="text-muted-foreground">
                    Paste your terms and import them into Wordulary.
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <ImportTermsForm />
            </div>

            <div className="space-y-4">
                <p>Need AI-generated definitions and examples?</p>

                <Link
                    href="/dashboard/terms/new"
                    className="rounded border px-4 py-2"
                >
                    Add Term
                </Link>
            </div>
        </div>
    );
}