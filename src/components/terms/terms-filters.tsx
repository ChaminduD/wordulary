"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading-spinner";

type TermsFiltersProps = {
    hasTerms: boolean;
    status: string;
    ai: string;
    searchQuery: string;
    resultCount: number;
};

export function TermsFilters({
    hasTerms,
    status,
    ai,
    searchQuery,
    resultCount,
}: TermsFiltersProps) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    if (!hasTerms) {
        return null;
    }

    function buildFilterHref(
        nextStatus?: string,
        nextAi?: string
    ) {
        const params = new URLSearchParams();

        if (searchQuery) {
            params.set("search", searchQuery);
        }

        if (nextStatus) {
            params.set("status", nextStatus);
        }

        if (nextAi) {
            params.set("ai", nextAi);
        }

        const query = params.toString();

        return query
            ? `/dashboard/terms?${query}`
            : "/dashboard/terms";
    }

    function navigate(nextStatus?: string, nextAi?: string) {
        startTransition(() => {
            router.push(buildFilterHref(nextStatus, nextAi));
        });
    }

    return (
        <>
            <div className="space-y-4 sm:space-y-0 sm:flex sm:gap-10">
                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-muted-foreground">
                        Status
                    </p>

                    <div className="flex gap-2 flex-wrap">
                        <Button
                            type="button"
                            variant={status === "new" ? "secondary" : "outline"}
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                navigate(
                                    status === "new"
                                        ? undefined
                                        : "new",
                                    ai
                                )
                            }
                        >
                            New
                        </Button>

                        <Button
                            type="button"
                            variant={status === "learning" ? "secondary" : "outline"}
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                navigate(
                                    status === "learning"
                                        ? undefined
                                        : "learning",
                                    ai
                                )
                            }
                        >
                            Learning
                        </Button>

                        <Button
                            type="button"
                            variant={status === "mastered" ? "secondary" : "outline"}
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                navigate(
                                    status === "mastered"
                                        ? undefined
                                        : "mastered",
                                    ai
                                )
                            }
                        >
                            Mastered
                        </Button>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-muted-foreground">
                        AI Content
                    </p>

                    <div className="flex gap-2 flex-wrap">
                        <Button
                            type="button"
                            variant={ai === "generated" ? "secondary" : "outline"}
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                navigate(
                                    status,
                                    ai === "generated"
                                        ? undefined
                                        : "generated"
                                )
                            }
                        >
                            Generated
                        </Button>

                        <Button
                            type="button"
                            variant={ai === "missing" ? "secondary" : "outline"}
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                navigate(
                                    status,
                                    ai === "missing"
                                        ? undefined
                                        : "missing"
                                )
                            }
                        >
                            Missing AI
                        </Button>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-3 items-center text-sm text-muted-foreground">
                <div>
                    <p>
                        {resultCount} {resultCount === 1 ? "term" : "terms"}
                    </p>
                </div>

                <div className="flex justify-center min-h-5">
                    {isPending && (
                        <div className="flex items-center gap-2">
                            <LoadingSpinner className="size-3" />
                            Updating...
                        </div>
                    )}
                </div>

                <div className="flex justify-end">
                    {(status || ai) && (
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            disabled={isPending}
                            onClick={() =>
                                startTransition(() => {
                                    router.push(
                                        searchQuery
                                            ? `/dashboard/terms?search=${encodeURIComponent(searchQuery)}`
                                            : "/dashboard/terms"
                                    );
                                })
                            }
                        >
                            ✕ Clear Filters
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
}