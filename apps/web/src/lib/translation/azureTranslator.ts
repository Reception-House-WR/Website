// lib/translation/azureTranslator.ts

const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT
const apiKey = process.env.AZURE_TRANSLATOR_KEY;
const region = process.env.AZURE_TRANSLATOR_REGION;

if (!apiKey || !region) {
  console.warn(
    "[azureTranslator] Missing AZURE_TRANSLATOR_KEY or AZURE_TRANSLATOR_REGION"
  );
}
export async function translateTextsAzure(
  texts: string[],
  from: string | undefined,
  to: string
): Promise<string[]> {
  if (!apiKey || !region) return texts;

  if (texts.length === 0) return [];

  const body = texts.map((t) => ({ Text: t }));

  const url = new URL("/translate", endpoint);
  url.searchParams.set("api-version", "3.0");
  if (from) url.searchParams.set("from", from);
  url.searchParams.set("to", to);

  const res = await fetch(url.toString(), {
    method: "POST",
    headers: {
      "Ocp-Apim-Subscription-Key": apiKey,
      "Ocp-Apim-Subscription-Region": region,
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    console.error(
      `[azureTranslator] Error ${res.status} ${res.statusText}: ${txt}`
    );
    return texts;
  }

  const json = (await res.json()) as any[];

  return json.map((item, idx) => {
    const translated = item?.translations?.[0]?.text;
    return translated ?? texts[idx];
  });
}
