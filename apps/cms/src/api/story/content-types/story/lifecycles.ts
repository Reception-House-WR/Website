
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const storyConfig: AutoTranslateConfig = {
  translatableFields: ["author", "quote"],
  syncFields: ["country", "image", "videoUrl"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    country: source.country,
    image: source.image,
    videoUrl: source.videoUrl,
  }),

  modelName: "Story",
};

export default createAutoTranslateLifecycles(storyConfig);
