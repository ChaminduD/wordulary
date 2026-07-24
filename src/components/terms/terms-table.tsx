import type { TermListItem } from "@/types/term-list-item";
import Link from "next/link";
import { deleteTermAction } from "@/actions/terms";
import { ConfirmDeleteButton } from "@/components/ui/confirm-delete-button";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";

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
            <div className="hidden rounded-xl border lg:block">
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
                                            itemName={term.term}
                                        />
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
                {terms.map((term) => (
                    <div
                        key={term.id}
                        className="rounded-xl border p-4 transition-colors hover:bg-muted/30"
                    >
                        <Link
                            href={`/dashboard/terms/${term.id}`}
                            className="block"
                        >
                            <h3 className="text-lg font-semibold hover:underline">
                                {term.term}
                            </h3>

                            <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                                <span className="capitalize">
                                    {term.termType}
                                </span>

                                <span>•</span>

                                <span>
                                    {new Date(term.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                        </Link>

                        <div className="mt-3 flex items-center justify-between">
                            <div className="flex flex-wrap gap-2">
                                <Badge variant="secondary" className="capitalize">
                                    {term.status}
                                </Badge>

                                <Badge variant="outline" className="gap-1">
                                    {term.aiGenerated && <Sparkles className="size-3" />}
                                    {term.aiGenerated ? "AI Generated" : "Missing AI"}
                                </Badge>
                            </div>

                            <form action={deleteTermAction}>
                                <input
                                    type="hidden"
                                    name="id"
                                    value={term.id}
                                />

                                <ConfirmDeleteButton
                                    itemName={term.term}
                                    iconOnly
                                />
                            </form>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}