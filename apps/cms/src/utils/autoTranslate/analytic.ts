import { SOURCE_LOCALE } from "../autoTranslate";
import { translateText } from "../translator";

export async function translateAnalyticItem(
  analytic: any,
  targetLocale: string
): Promise<any> {
  const result: any = {};

  // metric =>SYNC 
  result.metric = analytic.metric;

  // description => TRANSLATE
  if (
    typeof analytic.description === "string" &&
    analytic.description.trim().length > 0
  ) {
    result.description = await translateText(
      analytic.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = analytic.description ?? "";
  }

  // Copy any other fields except id, metric, description
  for (const key of Object.keys(analytic)) {
    if (key === "metric" || key === "description" || key === "id") continue;
    result[key] = analytic[key];
  }

  return result;
}
