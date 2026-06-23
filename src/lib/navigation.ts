export type NavigationItem = {
    href: string;
    label: string;
    icon: "home" | "book" | "folder" | "brain";
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
];