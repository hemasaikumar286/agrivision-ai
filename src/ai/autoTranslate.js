import { getAIResponse } from "./openRouter";

export async function autoTranslate(text, targetLanguage = "hindi") {
  const prompt = `
Translate the following sentence into ${targetLanguage}.
Keep it natural and suitable for farmers.

Sentence: ${text}
`;

  const result = await getAIResponse(prompt, targetLanguage);
  return result;
}