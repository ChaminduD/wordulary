import { generateTerm } from "@/lib/ai/generate-term";

export default async function TestPage() {
    const result = await generateTerm(
        "serendipity"
    );

    return (
        <pre className="whitespace-pre-wrap">
            {JSON.stringify(result, null, 2)}
        </pre>
    );
}