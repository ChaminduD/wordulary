import type { TermListItem } from "@/types/term-list-item";

type TermsTableProps = {
    terms: TermListItem[];
};

export function TermsTable({ terms, }: TermsTableProps) {
    if (terms.length === 0) {
        return (
            <div className="rounded-lg border p-6">
                No terms yet.
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
                                {term.term}
                            </td>

                            <td className="p-4">
                                {term.termType}
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