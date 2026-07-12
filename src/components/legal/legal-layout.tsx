import { Container } from "@/components/marketing/container";
import { LandingNavbar } from "../marketing/landing-navbar";
import { Footer } from "../marketing/footer";
import { createClient } from "@/lib/supabase/server";

type LegalLayoutProps = {
    title: string;
    lastUpdated: string;
    children: React.ReactNode;
};

export async function LegalLayout({
    title,
    lastUpdated,
    children,
}: LegalLayoutProps) {
    const supabase = await createClient();

    const {
        data: { user },
    } = await supabase.auth.getUser();

    return (
        <>
            <LandingNavbar user={user} />

            <main className="flex-1">
                <Container className="max-w-3xl py-16 md:py-20">
                    <div className="space-y-12">
                        <header className="space-y-3">
                            <h1 className="text-4xl font-semibold tracking-tight">
                                {title}
                            </h1>

                            <p className="text-sm text-muted-foreground">
                                Last updated: {lastUpdated}
                            </p>
                        </header>

                        {children}
                    </div>
                </Container>
            </main>

            <Footer />
        </>
    );
}