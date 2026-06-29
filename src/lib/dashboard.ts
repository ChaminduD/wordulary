export type DashboardStats = {
    totalTerms: number;
    learningTerms: number;
    masteredTerms: number;
    missingAiTerms: number;
};

export type DashboardHeroData = {
    title: string;
    description: string;
    buttonLabel: string;
    buttonHref: string;
};

export function getDashboardHero(
    stats: DashboardStats
): DashboardHeroData {
    if (stats.totalTerms === 0) {
        return {
            title: "Start Your Vocabulary",
            description: "Add your first term to begin building your personal vocabulary library.",
            buttonLabel: "Add First Term",
            buttonHref: "/dashboard/terms/new",
        };
    }

    if (stats.missingAiTerms > 0) {
        return {
            title: "Complete Your Vocabulary",
            description: "Some of your terms are missing AI content. Generate it before reviewing them.",
            buttonLabel: "View Terms",
            buttonHref: "/dashboard/terms",
        };
    }

    if (stats.learningTerms > 0) {
        return {
            title: "Continue Learning",
            description: `You have ${stats.learningTerms} ${stats.learningTerms === 1 ? "term" : "terms"} waiting for review.`,
            buttonLabel: "Start Review",
            buttonHref: "/dashboard/review",
        };
    }

    const hasUnmasteredTerms = stats.totalTerms > stats.masteredTerms;

    if (hasUnmasteredTerms) {
        return {
            title: "Ready to Learn",
            description: "Your terms are ready. Move some into Learning whenever you're ready to study them.",
            buttonLabel: "View Terms",
            buttonHref: "/dashboard/terms",
        };
    }

    return {
        title: "Great Progress",
        description: "You've reviewed everything you're currently learning. Add another term to continue expanding your vocabulary.",
        buttonLabel: "Add Term",
        buttonHref: "/dashboard/terms/new",
    };
}