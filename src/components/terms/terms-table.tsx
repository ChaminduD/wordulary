import type { TermListItem } from "@/types/term-list-item";
import Link from "next/link";

type TermsTableProps = {
    terms: TermListItem[];
    hasSearch: boolean;
    hasActiveFilter: boolean;
};

export function TermsTable({ terms, hasSearch, hasActiveFilter }: TermsTableProps) {
    if (terms.length === 0) {
        if (hasSearch) {
            return (
                <div className="rounded-lg border p-8 text-center">
                    <h3 className="font-semibold">
                        No matching terms found
                    </h3>

                    <p className="mt-2 text-sm text-muted-foreground">
                        Try a different search term.
                    </p>
                </div>
            );
        }

        if (hasActiveFilter) {
            return (
                <div className="rounded-lg border p-8 text-center">
                    <h3 className="font-semibold">
                        No matching terms found
                    </h3>
                </div>
            );
        }

        return (
            <div className="rounded-lg border p-8 text-center">
                <h3 className="font-semibold">
                    No terms yet
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Import your existing vocabulary
                    or add a new term to get started.
                </p>
            </div>
        );
    }

    return (
        <div className="rounded-lg border">
            <table className="w-full">
                <thead>
                    <tr className="border-b">
                        <th className="p-4 text-left">
                            Term
                        </th>

                        <th className="p-4 text-left">
                            Type
                        </th>

                        <th className="p-4 text-left">
                            Status
                        </th>

                        <th className="p-4 text-left">
                            AI Status
                        </th>

                        <th className="p-4 text-left">
                            Created
                        </th>
                    </tr>
                </thead>

                <tbody>
                    {terms.map((term) => (
                        <tr
                            key={term.id}
                            className="border-b"
                        >
                            <td className="p-4">
                                <Link
                                    href={`/dashboard/terms/${term.id}`}
                                    className="hover:underline"
                                >
                                    {term.term}
                                </Link>
                            </td>

                            <td className="p-4">
                                {term.termType}
                            </td>

                            <td className="p-4 capitalize">
                                {term.status}
                            </td>

                            <td className="p-4">
                                {term.aiGenerated
                                    ? "Generated"
                                    : "Missing AI"}
                            </td>

                            <td className="p-4">
                                {new Date(
                                    term.createdAt
                                ).toLocaleDateString()}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}