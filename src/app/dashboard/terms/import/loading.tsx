import { Skeleton } from "@/components/ui/skeleton";

export default function ImportTermsLoading() {
    return (
        <div className="space-y-8">
            <section className="space-y-2">
                <Skeleton className="h-9 w-56" />
                <Skeleton className="h-5 w-80" />
            </section>

            <div className="rounded-xl border p-6 space-y-6">
                <div className="space-y-2">
                    <Skeleton className="h-4 w-28" />
                    <Skeleton className="h-48 w-full" />
                </div>

                <div className="flex justify-end">
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>
        </div>
    );
}