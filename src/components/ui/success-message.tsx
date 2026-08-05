import { cn } from "@/lib/utils";

type SuccessMessageProps = {
    children: React.ReactNode;
    className?: string;
};

export function SuccessMessage({
    children,
    className,
}: SuccessMessageProps) {
    return (
        <div
            role="status"
            className={cn(
                "rounded-md border border-success/20 bg-success/10 px-4 py-3 text-sm text-success",
                className
            )}
        >
            {children}
        </div>
    );
}