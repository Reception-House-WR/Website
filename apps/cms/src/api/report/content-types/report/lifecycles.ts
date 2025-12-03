
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const reportConfig: AutoTranslateConfig = {
  translatableFields: ["name", "description"],
  syncFields: ["document"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    document: source.document
  }),

  modelName: "Report",
};

export default createAutoTranslateLifecycles(reportConfig);