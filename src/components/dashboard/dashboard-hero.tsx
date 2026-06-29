import Link from "next/link";
import { Button } from "@/components/ui/button";
import type {
    DashboardHeroData,
} from "@/lib/dashboard";

type DashboardHeroProps = DashboardHeroData;

export function DashboardHero({
    title,
    description,
    buttonLabel,
    buttonHref,
}: DashboardHeroProps) {
    return (
        <section className="rounded-xl border p-8">
            <div className="space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold tracking-tight">
                        {title}
                    </h2>

                    <p className="mt-2 text-muted-foreground">
                        {description}
                    </p>
                </div>

                <Button asChild>
                    <Link href={buttonHref}>
                        {buttonLabel}
                    </Link>
                </Button>
            </div>
        </section>
    );
}