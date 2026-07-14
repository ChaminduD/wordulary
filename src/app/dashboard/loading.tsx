import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
    return (
            <div className="space-y-8">
                <section>
                    <Skeleton className="h-9 w-52" />

                    <Skeleton className="mt-2 h-5 w-72" />
                </section>

                <Skeleton className="h-40 w-full rounded-xl" />

                <section className="space-y-4">
                    <Skeleton className="h-7 w-36" />

                    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                        {Array.from({ length: 4 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-28 rounded-xl"
                            />
                        ))}
                    </div>
                </section>

                <section className="space-y-4">
                    <Skeleton className="h-7 w-36" />

                    <Skeleton className="h-64 rounded-xl" />
                </section>
            </div>
    );
}