import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            <section>
                <Skeleton className="h-9 w-28" />

                <Skeleton className="mt-2 h-4 w-44" />
            </section>

            <section className="rounded-xl border p-6">
                <Skeleton className="h-6 w-24" />

                <div className="mt-6 space-y-4">
                    <div>
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="mt-2 h-5 w-40" />
                    </div>

                    <div>
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="mt-2 h-5 w-56" />
                    </div>
                </div>
            </section>

            <section className="rounded-xl border p-6">
                <Skeleton className="h-6 w-24" />

                <Skeleton className="mt-2 h-4 w-56" />

                <Skeleton className="mt-6 h-10 w-28" />
            </section>
        </div>
    );
}