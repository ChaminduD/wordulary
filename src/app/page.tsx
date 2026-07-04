import { LandingNavbar } from "@/components/marketing/landing-navbar";
import { HeroSection } from "@/components/marketing/hero-section";
import { FeaturesSection } from "@/components/marketing/features-section";
import { HowItWorksSection } from "@/components/marketing/how-it-works-section";
// import { CtaSection } from "@/components/marketing/cta-section";
// import { Footer } from "@/components/marketing/footer";

export default function Home() {
    return (
        <>
            <LandingNavbar />
            <HeroSection />
            <FeaturesSection />
            <HowItWorksSection />
            {/* <CtaSection />
            <Footer /> */}
        </>
    );
}