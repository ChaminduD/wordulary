import { cn } from "@/lib/utils";

export function getSidebarLinkClass(isActive: boolean) {
    return cn(
        "flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors disabled:pointer-events-none disabled:opacity-50",
        isActive
            ? "bg-muted font-medium text-primary"
            : "text-muted-foreground hover:bg-muted hover:text-foreground"
    );
}