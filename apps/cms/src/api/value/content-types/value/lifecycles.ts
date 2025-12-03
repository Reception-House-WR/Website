import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const valueConfig: AutoTranslateConfig = {
  translatableFields: ["name", "description"],
  syncFields: [],

  buildBaseData: (source: any, _targetLocale: string) => ({
  }),

  modelName: "Value",
};

export default createAutoTranslateLifecycles(valueConfig);
