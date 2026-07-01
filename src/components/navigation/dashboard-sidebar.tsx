import { navigation } from "@/lib/navigation";
import { NavLink } from "@/components/navigation/nav-link";

export function DashboardSidebar() {
    return (
        <aside className="fixed left-0 top-0 hidden h-screen w-64 flex-col border-r bg-background p-4 md:flex">
            <div className="mb-8">
                <h2 className="text-2xl font-semibold tracking-tight">
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
        </aside>
    );
}