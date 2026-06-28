type ProgressCardProps = {
    value: number;
    label: string;
};

export function ProgressCard({
    value,
    label,
}: ProgressCardProps) {
    return (
        <div className="rounded-xl border p-6">
            <p className="text-4xl font-semibold">
                {value}
            </p>

            <p className="mt-2 text-sm text-muted-foreground">
                {label}
            </p>
        </div>
    );
}