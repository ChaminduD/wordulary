import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type FeatureBadgeProps = {
    icon: LucideIcon;
    children: React.ReactNode;
    className?: string;
};

export function FeatureBadge({
    icon: Icon,
    children,
    className,
}: FeatureBadgeProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2 rounded-full border bg-muted/50 px-4 py-2 text-sm font-medium",
                className
            )}
        >
            <Icon className="size-4 text-primary" />

            <span>{children}</span>
        </div>
    );
}