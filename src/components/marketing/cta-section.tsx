import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import type { User } from "@supabase/supabase-js";

type CtaSectionProps = {
    user: User | null;
};

export function CtaSection({ user }: CtaSectionProps) {
    return (
        <section className="bg-muted/20 py-24 md:py-28">
            <Container>
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-medium text-primary">
                        Ready to Start?
                    </p>

                    <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">
                        Start remembering every word you learn.
                    </h2>

                    <p className="mt-4 text-lg leading-8 text-muted-foreground">
                        Build your vocabulary with AI and remember every word with confidence.
                    </p>

                    {user ? (
                        <Button
                            asChild
                            size="lg"
                            className="mt-10 h-11 px-6"
                        >
                            <Link href="/dashboard">
                                Go to Dashboard
                            </Link>
                        </Button>
                    ) : (
                        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
                            <Button
                                asChild
                                size="lg"
                                className="h-11 px-6"
                            >
                                <Link href="/sign-up">
                                    Get Started
                                </Link>
                            </Button>

                            <Button
                                asChild
                                variant="outline"
                                size="lg"
                                className="h-11 px-6"
                            >
                                <Link href="/login">
                                    Sign In
                                </Link>
                            </Button>
                        </div>
                    )}
                </div>
            </Container>
        </section>
    );
}