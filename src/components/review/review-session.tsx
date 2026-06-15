"use client";

import { useState } from "react";

type ReviewTerm = {
    id: string;
    term: string;
    definition: string | null;
    example_sentences: string[] | null;
};

type ReviewSessionProps = {
    terms: ReviewTerm[];
};

export function ReviewSession({ terms, }: ReviewSessionProps) {
    const [showAnswer, setShowAnswer] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [updating, setUpdating] = useState(false);

    const currentTerm = terms[currentIndex];

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

    if (!currentTerm) {
        return (
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                    Review Complete
                </h2>

                <p className="text-muted-foreground">
                    You&apos;ve reviewed all available terms.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-3xl font-bold">
                {currentTerm.term}
            </h2>

            {!showAnswer ? (
                <button
                    type="button"
                    className="rounded border px-4 py-2"
                    onClick={() => setShowAnswer(true)}
                >
                    Show Definition
                </button>
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

                    <div className="flex gap-4">
                        <button
                            type="button"
                            disabled={updating}
                            className="rounded border px-4 py-2"
                            onClick={handleMarkMastered}
                        >
                            Mark Mastered
                        </button>

                        <button
                            type="button"
                            className="rounded border px-4 py-2"
                            onClick={handleNext}
                        >
                            Next Term
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}