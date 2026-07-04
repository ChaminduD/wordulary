import {
    Sparkles,
    FolderOpen,
    Brain,
    TrendingUp,
} from "lucide-react";

import { Container } from "./container";
import { FeatureCard } from "./feature-card";

export function FeaturesSection() {
    return (
        <section
            id="features"
            className="bg-muted/20 py-24 md:py-28"
        >
            <Container>
                <div className="mx-auto max-w-2xl text-center">
                    <p className="text-sm font-medium text-primary">
                        Features
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                        Built for better vocabulary learning.
                    </h2>

                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Everything you need to collect,
                        organize, and remember new words.
                    </p>
                </div>

                <div className="mt-16 grid gap-6 md:grid-cols-2">
                    <FeatureCard
                        icon={Sparkles}
                        title="AI Definitions"
                    >
                        Generate definitions, examples,
                        synonyms, and antonyms instantly
                        with AI.
                    </FeatureCard>

                    <FeatureCard
                        icon={FolderOpen}
                        title="Collections"
                    >
                        Organize related words into
                        custom collections for focused
                        learning.
                    </FeatureCard>

                    <FeatureCard
                        icon={Brain}
                        title="Smart Review"
                    >
                        Review learning terms and move
                        mastered words forward as you
                        improve.
                    </FeatureCard>

                    <FeatureCard
                        icon={TrendingUp}
                        title="Track Progress"
                    >
                        See how your vocabulary grows
                        as you learn, review, and
                        master new terms.
                    </FeatureCard>
                </div>
            </Container>
        </section>
    );
}