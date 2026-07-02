import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoMarkProps = {
    href?: string;
    className?: string;
    priority?: boolean;
};

export function LogoMark({
    href = "/",
    className,
    priority = false,
}: LogoMarkProps) {
    return (
        <Link
            href={href}
            className={cn("inline-flex", className)}
        >
            <Image
                src="/branding/logo-mark.svg"
                alt="Wordulary"
                width={32}
                height={32}
                priority={priority}
            />
        </Link>
    );
}