import { cn } from "@/lib/utils";

type StepCardProps = {
    step: number;
    title: string;
    children: React.ReactNode;
    className?: string;
};

export function StepCard({
    step,
    title,
    children,
    className,
}: StepCardProps) {
    return (
        <article
            className={cn(
                "flex flex-col items-center text-center",
                className
            )}
        >
            <div className="flex size-12 items-center justify-center rounded-full border bg-muted text-lg font-semibold text-primary">
                {step}
            </div>

            <h3 className="mt-6 text-xl font-semibold">
                {title}
            </h3>

            <p className="mt-3 max-w-sm leading-7 text-muted-foreground">
                {children}
            </p>
        </article>
    );
}