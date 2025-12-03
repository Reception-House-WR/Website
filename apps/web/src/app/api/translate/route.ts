// app/api/translate/route.ts
import { NextRequest, NextResponse } from "next/server";
import { translateTextsAzure } from "@/lib/translation/azureTranslator";
import {
  getCachedTranslation,
  setCachedTranslation,
} from "@/lib/translation/cache";

type TranslateBody = {
  texts: string[];
  from?: string;
  to: string;
};

export async function POST(req: NextRequest) {
  const body = (await req.json()) as TranslateBody;

  const texts = body.texts ?? [];
  const from = body.from;
  const to = body.to;

  if (!to || !Array.isArray(texts)) {
    return NextResponse.json(
      { error: "Invalid payload" },
      { status: 400 }
    );
  }

  const result: string[] = new Array(texts.length);
  const missing: { index: number; text: string }[] = [];

  // 1) Fill from cache if possible
  texts.forEach((text, index) => {
    const cached = getCachedTranslation(text, from, to);
    if (cached !== undefined) {
      result[index] = cached;
    } else {
      missing.push({ index, text });
    }
  });

  // 2) Call Azure only for missing ones
  if (missing.length > 0) {
    const toTranslate = missing.map((m) => m.text);
    const translated = await translateTextsAzure(toTranslate, from, to);

    translated.forEach((t, idx) => {
      const originalIdx = missing[idx].index;
      result[originalIdx] = t;
      setCachedTranslation(missing[idx].text, from, to, t);
    });
  }

  return NextResponse.json({ translations: result });
}
