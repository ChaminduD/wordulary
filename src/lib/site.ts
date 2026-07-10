export const siteConfig = {
    name: "Wordulary",

    description:
        "Learn vocabulary smarter with AI. Save words, generate AI-powered definitions, organize collections, and remember every word with confidence.",

    url: process.env.NEXT_PUBLIC_SITE_URL!,

    github: "https://github.com/ChaminduD/wordulary",

    ogImage: "/opengraph-image.png",

    privacyLastUpdated: "June 2026",

    termsLastUpdated: "June 2026",
} as const;