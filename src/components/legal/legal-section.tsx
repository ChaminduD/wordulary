type LegalSectionProps = {
    title: string;
    children: React.ReactNode;
};

export function LegalSection({
    title,
    children,
}: LegalSectionProps) {
    return (
        <section className="space-y-4">
            <h2 className="text-2xl font-semibold tracking-tight">
                {title}
            </h2>

            <div className="space-y-4 leading-8 text-muted-foreground">
                {children}
            </div>
        </section>
    );
}