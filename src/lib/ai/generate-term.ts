import { GoogleGenAI } from "@google/genai";
import { generatedTermSchema } from "./schema";
import type { GeneratedTerm } from "@/types/term";

export async function generateTerm(term: string): Promise<GeneratedTerm> {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY, });

  const prompt = `
    Generate vocabulary learning data for the term "${term}".

    Rules:

    - Use simple English.
    - Return valid JSON only.
    - Do not use markdown.
    - Do not include trailing commas.
    - Do not wrap the JSON in markdown code blocks.
    - Do not include explanations outside JSON.
    - Return only the JSON object.

    Return exactly this structure:

    {
      "term": "string",
      "termType": "word | phrase | idiom | phrasal_verb | expression",
      "definition": "string",
      "exampleSentences": [
        "string",
        "string",
        "string"
      ],
      "synonyms": [
        "string",
        "string",
        "string"
      ],
      "antonyms": [
        "string",
        "string",
        "string"
      ],
      "difficulty": "beginner | intermediate | advanced"
    }
  `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });

  const text = response.text;

  if (!text) {
    throw new Error("No response from Gemini");
  }

  const parsed = JSON.parse(text);

  const generatedTerm =
    generatedTermSchema.parse(parsed);

  return generatedTerm;
}