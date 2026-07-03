import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Container } from "./container";
import {
    Sparkles,
    FolderOpen,
    Brain,
    TrendingUp,
} from "lucide-react";
import { FeatureBadge } from "./feature-badge";
import { DashboardPreview } from "./dashboard-preview";

export function HeroSection() {
    return (
        <section className="py-24 md:py-32">
            <Container>
                <div className="grid items-center gap-16 lg:grid-cols-[3fr_2fr]">
                    <div className="space-y-10">
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h1 className="max-w-3xl text-4xl font-semibold tracking-tight leading-tight md:text-6xl md:leading-[1.1]">
                                    Stop collecting words. Start remembering them.
                                </h1>

                                <p className="max-w-xl text-lg leading-8 text-muted-foreground">
                                    Save words, generate AI-powered definitions and examples,
                                    organize them into collections, and review them until
                                    they stick.
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <FeatureBadge icon={Sparkles}>
                                    AI Definitions
                                </FeatureBadge>

                                <FeatureBadge icon={FolderOpen}>
                                    Collections
                                </FeatureBadge>

                                <FeatureBadge icon={Brain}>
                                    Smart Review
                                </FeatureBadge>

                                <FeatureBadge icon={TrendingUp}>
                                    Track Progress
                                </FeatureBadge>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3 sm:flex-row">
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
                    </div>

                    <DashboardPreview />
                </div>
            </Container>
        </section>
    );
}