import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
  SOURCE_LOCALE,
} from "../../../../utils/autoTranslate";
import { translateText } from "../../../../utils/translator";

const tagConfig: AutoTranslateConfig = {
  // Fields that should be translated using translateText()
  translatableFields: ["pageLabel", "sectionLabel", "description", "tags"],

  // Fields that must remain identical across all locales
  syncFields: ["identifier", "href"],

  //base data
  buildBaseData: (source: any, _targetLocale: string) => ({
    identifier: source.identifier,
    href: source.href,
  }),

  /**
   * Custom translators for tag:
   *  - Split the field by spaces 
   *  - Translate each individual word
   *  - Rejoin them into a single space string
   */
  fieldTranslators: {
    async tags(value: any, targetLocale: string) {
      if (typeof value !== "string" || !value.trim()) {
        return value ?? "";
      }

      //Split into separate words (wordTag)
      const wordTag = value.split(/\s+/).filter(Boolean);

      const translatedwordTag: string[] = [];

      // Translate each individual token
      for (const word of wordTag) {
        const translated = await translateText(
          word,
          SOURCE_LOCALE,
          targetLocale
        );
        translatedwordTag.push(translated);
      }

      //Combine again
      return translatedwordTag.join(" ");
    },
  },

  modelName: "Tag",
};

export default createAutoTranslateLifecycles(tagConfig);
