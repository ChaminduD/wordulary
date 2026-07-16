import { Skeleton } from "@/components/ui/skeleton";

export default function TermsLoading() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                    <Skeleton className="h-9 w-48" />
                    <Skeleton className="h-5 w-64" />
                </div>

                <div className="flex gap-2">
                    <Skeleton className="h-10 w-28" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            <div className="space-y-6 rounded-xl border p-6">
                <Skeleton className="h-10 w-full" />

                <div className="space-y-4 sm:flex sm:gap-10 sm:space-y-0">
                    <div className="space-y-2">
                        <Skeleton className="h-4 w-16" />

                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-16" />
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Skeleton className="h-4 w-20" />

                        <div className="flex gap-2">
                            <Skeleton className="h-8 w-24" />
                            <Skeleton className="h-8 w-24" />
                        </div>
                    </div>
                </div>

                <Skeleton className="h-4 w-20" />
            </div>

            <Skeleton className="h-96 rounded-xl" />
        </div>
    );
}