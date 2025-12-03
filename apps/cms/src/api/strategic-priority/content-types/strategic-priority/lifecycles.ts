import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const strategicPriorityConfig: AutoTranslateConfig = {
  translatableFields: ["description"],
  syncFields: ["priority"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    priority: source.priority
  }),

  modelName: "StrategicPriority",
};

export default createAutoTranslateLifecycles(strategicPriorityConfig);
