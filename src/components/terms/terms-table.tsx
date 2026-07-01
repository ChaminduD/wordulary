import type { TermListItem } from "@/types/term-list-item";
import Link from "next/link";
import { deleteTermAction } from "@/actions/terms";
import { ConfirmDeleteButton } from "./confirm-delete-button";

type TermsTableProps = {
    terms: TermListItem[];
    hasSearch: boolean;
    hasActiveFilter: boolean;
};

export function TermsTable({ terms, hasSearch, hasActiveFilter }: TermsTableProps) {
    if (terms.length === 0) {
        if (hasSearch) {
            return (
                <div className="rounded-xl border p-8 text-center">
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
                <div className="rounded-xl border p-8 text-center">
                    <h3 className="font-semibold">
                        No matching terms found
                    </h3>
                </div>
            );
        }

        return (
            <div className="rounded-xl border p-8 text-center">
                <h3 className="font-semibold">
                    No terms yet
                </h3>

                <p className="mt-2 text-sm text-muted-foreground">
                    Import your vocabulary list or add your first term to start building your library.
                </p>
            </div>
        );
    }

    return (
        <>
            <div className="hidden rounded-xl border md:block">
                <table className="w-full">
                    <thead>
                        <tr className="border-b">
                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                Term
                            </th>

                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                Type
                            </th>

                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                Status
                            </th>

                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                AI Status
                            </th>

                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                Created
                            </th>

                            <th className="p-4 text-left text-sm font-semibold text-muted-foreground">
                                Actions
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {terms.map((term) => (
                            <tr
                                key={term.id}
                                className="border-b transition-colors hover:bg-muted/50"
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

                                <td className="p-4">
                                    <form action={deleteTermAction}>
                                        <input
                                            type="hidden"
                                            name="id"
                                            value={term.id}
                                        />

                                        <ConfirmDeleteButton
                                            termName={term.term}
                                        />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="space-y-3 md:hidden">
                {terms.map((term) => (
                    <div
                        key={term.id}
                        className="rounded-xl border p-4"
                    >
                        <Link
                            href={`/dashboard/terms/${term.id}`}
                            className="font-semibold hover:underline"
                        >
                            {term.term}
                        </Link>

                        <div className="mt-2 space-y-1 text-sm text-muted-foreground">
                            <p>
                                Type: {term.termType}
                            </p>

                            <p className="capitalize">
                                Status: {term.status}
                            </p>

                            <p>
                                AI: {
                                    term.aiGenerated
                                        ? "Generated"
                                        : "Missing AI"
                                }
                            </p>

                            <p>
                                Created: {
                                    new Date(
                                        term.createdAt
                                    ).toLocaleDateString()
                                }
                            </p>
                        </div>

                        <div className="mt-4">
                            <form action={deleteTermAction}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={term.id}
                                />

                                <ConfirmDeleteButton
                                    termName={term.term}
                                />
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}