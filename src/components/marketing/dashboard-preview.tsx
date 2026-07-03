export function DashboardPreview() {
    return (
        <div className="overflow-hidden rounded-2xl border shadow-xl lg:rotate-2">
            <div className="flex h-10 items-center gap-2 border-b bg-muted px-4">
                <span className="size-3 rounded-full bg-red-400" />

                <span className="size-3 rounded-full bg-yellow-400" />

                <span className="size-3 rounded-full bg-green-400" />
            </div>

            <div className="aspect-[4/3] bg-muted/30" />
        </div>
    );
}