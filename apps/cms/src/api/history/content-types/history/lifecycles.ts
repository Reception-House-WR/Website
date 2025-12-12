
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const historyConfig: AutoTranslateConfig = {
  translatableFields: ["title", "description"],
  syncFields: ["year", "order", "image"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    year: source.year,
    order: source.order,
    image: source.image
  }),

  modelName: "History",
};

export default createAutoTranslateLifecycles(historyConfig);