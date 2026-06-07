import { SignOutButton } from "@/components/auth/sign-out-button";

type DashboardHeaderProps = {
    userName: string;
};

export function DashboardHeader({
    userName,
}: DashboardHeaderProps) {
    return (
        <header className="flex items-center justify-between border-b p-6">
            <div>
                <h1 className="text-2xl font-bold">
                    Welcome, {userName}
                </h1>

                <p className="text-muted-foreground">
                    Continue building your vocabulary.
                </p>
            </div>

            <SignOutButton />
        </header>
    );
}