// lib/translation/service.ts
import { translateTextsAzure } from "./azureTranslator";
import {
  getCachedTranslation,
  setCachedTranslation,
} from "./cache";

export async function translateWithCache(
  texts: string[],
  from: string | undefined,
  to: string
): Promise<string[]> {
  if (!texts.length) return [];

  const result: string[] = new Array(texts.length);
  const missing: { index: number; text: string }[] = [];

  texts.forEach((text, index) => {
    const cached = getCachedTranslation(text, from, to);
    if (cached !== undefined) {
      result[index] = cached;
    } else {
      missing.push({ index, text });
    }
  });

  if (missing.length > 0) {
    const toTranslate = missing.map((m) => m.text);
    const translated = await translateTextsAzure(toTranslate, from, to);

    translated.forEach((t, idx) => {
      const originalIdx = missing[idx].index;
      result[originalIdx] = t;
      setCachedTranslation(missing[idx].text, from, to, t);
    });
  }

  return result;
}
