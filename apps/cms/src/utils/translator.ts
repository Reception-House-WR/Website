import axios from "axios";

const AZURE_TRANSLATOR_ENDPOINT = process.env.AZURE_TRANSLATOR_ENDPOINT;
const AZURE_TRANSLATOR_KEY = process.env.AZURE_TRANSLATOR_KEY;
const AZURE_TRANSLATOR_REGION = process.env.AZURE_TRANSLATOR_REGION;

// export async function translateText(
//   text: string,
//   from: string,
//   to: string
// ): Promise<string> {
//   if (!text) return text;

//   const url = `${AZURE_TRANSLATOR_ENDPOINT}/translate?api-version=3.0&from=${from}&to=${to}`;

//   const response = await axios.post(
//     url,
//     [{ Text: text }],
//     {
//       headers: {
//         "Ocp-Apim-Subscription-Key": AZURE_TRANSLATOR_KEY,
//         "Ocp-Apim-Subscription-Region": AZURE_TRANSLATOR_REGION,
//         "Content-Type": "application/json",
//       },
//     }
//   );

//   return response.data?.[0]?.translations?.[0]?.text ?? text;
// }
export async function translateText(text: string, from: string, to: string) {
  return `[${to}] ${text}`;
}

