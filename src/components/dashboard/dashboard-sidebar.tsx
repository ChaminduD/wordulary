import Link from "next/link";

export function DashboardSidebar() {
    return (
        <aside className="w-64 border-r p-4">
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    Wordulary
                </h2>
            </div>

            <nav className="space-y-2">
                <Link
                    href="/dashboard"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Overview
                </Link>

                <Link
                    href="/dashboard/terms"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Terms
                </Link>

                <Link
                    href="/dashboard/collections"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Collections
                </Link>

                <Link
                    href="/dashboard/terms/new"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Add Term
                </Link>

                <Link
                    href="/dashboard/terms/import"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Import Terms
                </Link>
            </nav>
        </aside>
    );
}