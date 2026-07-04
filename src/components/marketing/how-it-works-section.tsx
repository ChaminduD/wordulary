import { Container } from "./container";
import { StepCard } from "./step-card";

export function HowItWorksSection() {
    return (
        <section
            id="how-it-works"
            className="py-24 md:py-28"
        >
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium text-primary">
                        How It Works
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                        Three simple steps to build lasting vocabulary.
                    </h2>

                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Go from collecting words to mastering them with AI.
                    </p>
                </div>

                <div className="mt-16 grid gap-12 md:grid-cols-3">
                    <StepCard
                        step={1}
                        title="Collect Words"
                    >
                        Import your existing vocabulary or
                        add new words whenever you discover them.
                    </StepCard>

                    <StepCard
                        step={2}
                        title="Generate AI Content"
                    >
                        Create definitions, examples,
                        synonyms, and antonyms instantly.
                    </StepCard>

                    <StepCard
                        step={3}
                        title="Review & Master"
                    >
                        Review learning terms regularly and
                        track your progress as you improve.
                    </StepCard>
                </div>
            </Container>
        </section>
    );
}