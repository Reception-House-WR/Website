
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const releaseConfig: AutoTranslateConfig = {
  translatableFields: ["title", "shortDesc", "longDesc"],
  syncFields: ["date", "image"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    date: source.date, 
    image: source.image
  }),

  modelName: "PressRelease",
};

export default createAutoTranslateLifecycles(releaseConfig);