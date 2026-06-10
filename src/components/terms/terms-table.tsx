import type { TermListItem } from "@/types/term-list-item";

type TermsTableProps = {
  terms: TermListItem[];
};

export function TermsTable({terms,}: TermsTableProps) {
  return (
    <div className="rounded-lg border p-6">
      {terms.length === 0
        ? "No terms yet."
        : `${terms.length} terms`}
    </div>
  );
}