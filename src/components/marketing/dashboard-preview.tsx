import Image from "next/image";

export function DashboardPreview() {
    return (
        <div className="mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-2xl border shadow-xl dark:ring-1 dark:ring-white/10 lg:rotate-2">
                <Image
                    src="/images/dashboard-preview.png"
                    alt="Wordulary dashboard showing vocabulary progress and recent terms."
                    width={1080}
                    height={810}
                    priority
                    className="h-auto w-full rounded-2xl"
                />
            </div>
        </div>
    );
}