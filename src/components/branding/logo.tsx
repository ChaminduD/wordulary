import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
    href?: string;
    className?: string;
    priority?: boolean;
};

export function Logo({
    href = "/",
    className,
    priority = false,
}: LogoProps) {
    return (
        <Link
            href={href}
            className={cn("inline-flex", className)}
        >
            <Image
                src="/branding/logo.svg"
                alt="Wordulary"
                width={170}
                height={29}
                sizes="170px"
                priority={priority}
            />
        </Link>
    );
}