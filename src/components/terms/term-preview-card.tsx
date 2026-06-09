import type { GeneratedTerm } from "@/types/term";

type TermPreviewCardProps = {
    generatedTerm: GeneratedTerm;
};

export function TermPreviewCard({
    generatedTerm,
}: TermPreviewCardProps) {
    return (
        <div className="space-y-4 rounded-lg border p-6">
            <div>
                <h3 className="text-2xl font-bold">
                    {generatedTerm.term}
                </h3>

                <p className="text-sm text-muted-foreground">
                    {generatedTerm.termType}
                </p>
            </div>

            <div>
                <h4 className="font-semibold">
                    Definition
                </h4>

                <p>{generatedTerm.definition}</p>
            </div>

            <div>
                <h4 className="font-semibold">
                    Example Sentences
                </h4>

                <ul className="list-disc pl-5">
                    {generatedTerm.exampleSentences.map(
                        (sentence) => (
                            <li key={sentence}>
                                {sentence}
                            </li>
                        )
                    )}
                </ul>
            </div>

            <div>
                <h4 className="font-semibold">
                    Synonyms
                </h4>

                <p>
                    {generatedTerm.synonyms.join(", ")}
                </p>
            </div>

            <div>
                <h4 className="font-semibold">
                    Antonyms
                </h4>

                <p>
                    {generatedTerm.antonyms.join(", ")}
                </p>
            </div>

            <div>
                <h4 className="font-semibold">
                    Difficulty
                </h4>

                <p>{generatedTerm.difficulty}</p>
            </div>
        </div>
    );
}