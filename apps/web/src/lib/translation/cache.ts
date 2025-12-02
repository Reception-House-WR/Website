const translationCache = new Map<string, string>();

function buildKey(text: string, from: string | undefined, to: string) {
  return JSON.stringify({ text, from: from ?? null, to });
}

export function getCachedTranslation(
  text: string,
  from: string | undefined,
  to: string
): string | undefined {
  return translationCache.get(buildKey(text, from, to));
}

export function setCachedTranslation(
  text: string,
  from: string | undefined,
  to: string,
  translated: string
) {
  translationCache.set(buildKey(text, from, to), translated);
}
