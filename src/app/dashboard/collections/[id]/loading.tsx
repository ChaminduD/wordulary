import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            <section>
                <Skeleton className="h-9 w-56" />

                <Skeleton className="mt-2 h-4 w-20" />
            </section>

            <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border p-4"
                    >
                        <Skeleton className="h-7 w-40" />

                        <div className="mt-3 flex flex-wrap gap-2">
                            <Skeleton className="h-6 w-24 rounded-full" />

                            <Skeleton className="h-6 w-20 rounded-full" />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}