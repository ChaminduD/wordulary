import { SignOutButton } from "@/components/auth/sign-out-button";
import { navigation } from "@/lib/navigation";
import { NavLink } from "@/components/navigation/nav-link";

type DashboardSidebarProps = {
    userName: string;
};

export function DashboardSidebar({ userName, }: DashboardSidebarProps) {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-background p-4 md:flex">
            <div className="mb-8">
                <h2 className="text-xl font-bold">
                    Wordulary
                </h2>
            </div>

            <nav className="space-y-2">
                {navigation.map((item) => {

                    return (
                        <NavLink
                            key={item.href}
                            href={item.href}
                            label={item.label}
                            icon={item.icon}
                        />
                    );
                })}
            </nav>

            <div className="mt-auto border-t pt-4">
                <p className="font-medium">
                    {userName}
                </p>

                <p className="mb-4 text-sm text-muted-foreground">
                    Continue learning
                </p>

                <SignOutButton />
            </div>
        </aside>
    );
}