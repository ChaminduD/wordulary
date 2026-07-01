export type NavigationItem = {
    href: string;
    label: string;
    icon: "home" | "book" | "folder" | "brain" | "profile";
};

export const navigation: NavigationItem[] = [
    {
        href: "/dashboard",
        label: "Dashboard",
        icon: "home",
    },
    {
        href: "/dashboard/terms",
        label: "Terms",
        icon: "book",
    },
    {
        href: "/dashboard/collections",
        label: "Collections",
        icon: "folder",
    },
    {
        href: "/dashboard/review",
        label: "Review",
        icon: "brain",
    },
    {
        href: "/dashboard/profile",
        label: "Profile",
        icon: "profile",
    },
];