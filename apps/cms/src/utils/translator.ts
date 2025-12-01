const endpoint = process.env.AZURE_TRANSLATOR_ENDPOINT
const apiKey = process.env.AZURE_TRANSLATOR_KEY;
const region = process.env.AZURE_TRANSLATOR_REGION;

// export async function translateText(
//   text: string,
//   from: string | undefined,
//   to: string
// ): Promise<string> {
//   if (!apiKey || !region) {
//     throw new Error(
//       "[translator] Missing AZURE_TRANSLATOR_KEY or AZURE_TRANSLATOR_REGION env vars"
//     );
//   }

//   if (!text || text.trim().length === 0) return text;

//   const url = new URL("/translate", endpoint);
//   url.searchParams.append("api-version", "3.0");
//   if (from) url.searchParams.append("from", from);
//   url.searchParams.append("to", to);

//   const body = [
//     {
//       Text: text,
//     },
//   ];

//   const response = await fetch(url.toString(), {
//     method: "POST",
//     headers: {
//       "Ocp-Apim-Subscription-Key": apiKey,
//       "Ocp-Apim-Subscription-Region": region,
//       "Content-Type": "application/json; charset=UTF-8",
//     },
//     body: JSON.stringify(body),
//   });

//   if (!response.ok) {
//     const errorMessage = await response.text().catch(() => "");

//     throw new Error(
//       `[translator] Azure error ${response.status}: ${response.statusText} - ${errorMessage}`
//     );
//   }

//   const json = await response.json();

//   const translated = json?.[0]?.translations?.[0]?.text ?? text;

//   return translated;
// }

export async function translateText(text: string, from: string, to: string) {
  return `[${to}] ${text}`;
}