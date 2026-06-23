import Link from "next/link";
import { SignOutButton } from "@/components/auth/sign-out-button";

type DashboardSidebarProps = {
    userName: string;
};

export function DashboardSidebar({ userName, }: DashboardSidebarProps) {
    return (
        <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col border-r bg-background p-4">
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
                    Dashboard
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
                    href="/dashboard/review"
                    className="block rounded-md px-3 py-2 hover:bg-muted"
                >
                    Review
                </Link>
            </nav>

            <div className="mt-auto border-t pt-4">
                <p className="font-medium">
                    {userName}
                </p>

                <p className="mb-4 text-sm text-muted-foreground">
                    Continue learning
                </p>

                <SignOutButton />
            </div>
        </aside>
    );
}