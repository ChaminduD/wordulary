"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

type ReviewTerm = {
    id: string;
    term: string;
    definition: string | null;
    example_sentences: string[] | null;
};

type ReviewSessionProps = {
    terms: ReviewTerm[];
    collectionId?: string;
};

export function ReviewSession({ terms, collectionId, }: ReviewSessionProps) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [updating, setUpdating] = useState(false);

    const currentTerm = terms[currentIndex];

    const router = useRouter();

    function handleNext() {
        setCurrentIndex((current) =>
            current + 1
        );

        setShowAnswer(false);
    }

    async function handleMarkMastered() {
        try {
            setUpdating(true);

            await fetch(
                `/api/terms/${currentTerm.id}/status`,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: "mastered", }),
                }
            );

            handleNext();
        } catch (error) {
            console.error(error);
        } finally {
            setUpdating(false);
        }
    }

    function handlePrevious() {
        if (currentIndex === 0) {
            return;
        }

        setCurrentIndex((current) => current - 1);

        setShowAnswer(false);
    }

    if (!currentTerm) {
        return (
            <div className="mt-2">
                <h2 className="text-2xl font-bold">
                    Review Complete
                </h2>

                <p className="text-muted-foreground mb-4">
                    You&apos;ve reviewed all available terms.
                </p>

                <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                        window.location.href =
                            collectionId
                                ? `/dashboard/review?collection=${collectionId}`
                                : "/dashboard/review";
                    }}
                >
                    Start Over
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <p className="text-sm text-muted-foreground">
                Term {currentIndex + 1} of {terms.length}
            </p>

            <h2 className="text-3xl font-bold">
                {currentTerm.term}
            </h2>

            {!showAnswer ? (
                <Button
                    type="button"
                    onClick={() => setShowAnswer(true)}
                >
                    Show Definition
                </Button>
            ) : null}

            {showAnswer && (
                <div className="space-y-4 rounded border p-4">
                    <div>
                        <h3 className="font-medium">
                            Definition
                        </h3>

                        <p>
                            {currentTerm.definition}
                        </p>
                    </div>

                    <div>
                        <h3 className="font-medium">
                            Examples
                        </h3>

                        <ul className="list-disc pl-5">
                            {currentTerm.example_sentences?.map(
                                (example, index) => (
                                    <li key={index}>
                                        {example}
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-2 sm:flex-row">
                        {currentIndex > 0 && (
                            <Button
                                type="button"
                                variant="ghost"
                                onClick={handlePrevious}
                            >
                                Previous
                            </Button>
                        )}

                        <Button
                            type="button"
                            onClick={handleMarkMastered}
                            disabled={updating}
                        >
                            Mark Mastered
                        </Button>

                        <Button
                            type="button"
                            variant="outline"
                            onClick={handleNext}
                        >
                            Next Term
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}