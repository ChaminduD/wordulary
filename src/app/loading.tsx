import { Logo } from "@/components/branding/logo";

export default function Loading() {
    return (
        <main className="flex min-h-screen items-center justify-center px-6">
            <div className="space-y-4 text-center">
                <Logo priority />

                <p className="text-sm text-muted-foreground">
                    Loading...
                </p>
            </div>
        </main>
    );
}