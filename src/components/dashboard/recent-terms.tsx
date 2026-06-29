import Link from "next/link";

type RecentTermsProps = {
    terms: {
        id: string;
        term: string;
        status: string;
    }[];
};

export function RecentTerms({ terms, }: RecentTermsProps) {
    if (terms.length === 0) {
        return null;
    }

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold">
                    Recent Terms
                </h2>

                <Link
                    href="/dashboard/terms"
                    className="text-sm text-muted-foreground hover:underline"
                >
                    View all
                </Link>
            </div>

            <div className="rounded-xl border">
                {terms.map((term) => (
                    <Link
                        key={term.id}
                        href={`/dashboard/terms/${term.id}`}
                        className="flex items-center justify-between border-b p-4 last:border-b-0 hover:bg-muted/50"
                    >
                        <span className="font-medium">
                            {term.term}
                        </span>

                        <span className="text-sm capitalize text-muted-foreground">
                            {term.status}
                        </span>
                    </Link>
                ))}
            </div>
        </section>
    );
}