import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type FeatureCardProps = {
    icon: LucideIcon;
    title: string;
    children: React.ReactNode;
    className?: string;
};

export function FeatureCard({
    icon: Icon,
    title,
    children,
    className,
}: FeatureCardProps) {
    return (
        <article
            className={cn(
                "rounded-2xl border p-8 transition-all hover:border-primary/20 hover:bg-muted/20",
                className
            )}
        >
            <Icon className="size-8 text-primary" />

            <div className="mt-6 space-y-3">
                <h3 className="text-xl font-semibold">
                    {title}
                </h3>

                <p className="leading-7 text-muted-foreground">
                    {children}
                </p>
            </div>
        </article>
    );
}