import { ImportTermsForm } from "@/components/terms/import-terms-form";

export default function ImportTermsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Import Terms
                </h1>

                <p className="text-muted-foreground">
                    Paste your terms and import
                    them into Wordulary.
                </p>
            </div>

            <div className="rounded-lg border p-6">
                <ImportTermsForm />
            </div>
        </div>
    );
}