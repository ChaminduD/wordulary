import Link from "next/link";
import { Button } from "@/components/ui/button";

export function DashboardHero() {
    return (
        <section className="rounded-xl border p-8">
            <div className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        Continue Learning
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        You have terms waiting for review.
                    </p>
                </div>

                <Button asChild>
                    <Link href="/dashboard/review">
                        Start Review
                    </Link>
                </Button>
            </div>
        </section>
    );
}