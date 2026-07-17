import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-8">
            <section>
                <Skeleton className="h-9 w-32" />

                <Skeleton className="mt-2 h-4 w-80 max-w-full" />
            </section>

            <section className="space-y-3">
                <div>
                    <Skeleton className="h-6 w-24" />

                    <Skeleton className="mt-2 h-4 w-96 max-w-full" />
                </div>

                <Skeleton className="h-10 w-full sm:w-64" />
            </section>

            <section className="space-y-6">
                <Skeleton className="h-4 w-16" />

                <Skeleton className="h-10 w-56" />

                <Skeleton className="h-10 w-40" />

                <div className="space-y-6 rounded-xl border p-6">
                    <div>
                        <Skeleton className="h-4 w-20" />

                        <Skeleton className="mt-3 h-4 w-full" />
                        <Skeleton className="mt-2 h-4 w-5/6" />
                        <Skeleton className="mt-2 h-4 w-2/3" />
                    </div>

                    <div>
                        <Skeleton className="h-4 w-20" />

                        <Skeleton className="mt-3 h-4 w-full" />
                        <Skeleton className="mt-2 h-4 w-11/12" />
                        <Skeleton className="mt-2 h-4 w-3/4" />
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        <Skeleton className="h-10 w-28" />
                        <Skeleton className="h-10 w-28" />
                        <Skeleton className="h-10 w-36" />
                    </div>
                </div>
            </section>
        </div>
    );
}