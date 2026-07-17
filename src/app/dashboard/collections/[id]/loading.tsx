import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            <section>
                <Skeleton className="h-9 w-56" />

                <Skeleton className="mt-2 h-4 w-20" />
            </section>

            <section className="space-y-3">
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border p-4"
                    >
                        <Skeleton className="h-5 w-40" />

                        <div className="mt-3 space-y-2">
                            <Skeleton className="h-4 w-28" />

                            <Skeleton className="h-4 w-20" />
                        </div>
                    </div>
                ))}
            </section>
        </div>
    );
}