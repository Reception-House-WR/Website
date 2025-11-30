
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const employeeConfig: AutoTranslateConfig = {
  translatableFields: ["role", "department"],
  syncFields: ["name", "email", "image"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    name: source.name,
    email: source.email,
    image: source.image,
  }),

  modelName: "Employee",
};

export default createAutoTranslateLifecycles(employeeConfig);