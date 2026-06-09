export function TermGeneratorForm() {
    return (
        <form className="space-y-4">
            <input
                type="text"
                placeholder="Enter a word, phrase, or idiom"
                className="w-full rounded border px-3 py-2"
            />

            <button
                type="submit"
                className="rounded border px-4 py-2"
            >
                Generate
            </button>
        </form>
    );
}