import { LandingNavbar } from "@/components/marketing/landing-navbar";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
import { CtaSection } from "@/components/marketing/cta-section";
import { Footer } from "@/components/marketing/footer";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
    title: "Learn Vocabulary Smarter with AI",
};

export default async function HomePage() {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <LandingNavbar user={user} />

            <main className="flex-1">
                <HeroSection user={user} />
                <FeaturesSection />
                <HowItWorksSection />
                <CtaSection user={user} />
            </main>

            <Footer />
        </>
    );
}