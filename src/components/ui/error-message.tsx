import { cn } from "@/lib/utils";

type ErrorMessageProps = {
    children: React.ReactNode;
    className?: string;
};

export function ErrorMessage({
    children,
    className,
}: ErrorMessageProps) {
    return (
        <div
            role="alert"
            className={cn(
                "rounded-md border border-destructive/20 bg-destructive/10 px-4 py-3 text-sm text-destructive",
                className
            )}
        >
            {children}
        </div>
    );
}