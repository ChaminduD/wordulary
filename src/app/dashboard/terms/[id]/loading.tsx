import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
    return (
        <div className="space-y-6">
            <div>
                <Skeleton className="h-9 w-56" />

                <Skeleton className="mt-2 h-4 w-24" />
            </div>

            <div className="space-y-8 rounded-xl border p-6">
                <div className="space-y-3">
                    <Skeleton className="h-6 w-20" />

                    <Skeleton className="h-10 w-full sm:w-64" />
                </div>

                <div className="space-y-3">
                    <Skeleton className="h-6 w-24" />

                    <div className="space-y-2">
                        {Array.from({ length: 3 }).map((_, index) => (
                            <div
                                key={index}
                                className="flex items-center gap-2"
                            >
                                <Skeleton className="size-4 rounded-sm" />

                                <Skeleton className="h-4 w-32" />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="space-y-4">
                    <Skeleton className="h-6 w-24" />

                    <Skeleton className="h-5 w-40" />

                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            <div className="rounded-xl border p-6">
                <Skeleton className="h-6 w-32" />

                <Skeleton className="mt-2 h-4 w-56" />

                <Skeleton className="mt-4 h-10 w-32" />
            </div>
        </div>
    );
}