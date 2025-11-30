
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const campaignConfig: AutoTranslateConfig = {
  translatableFields: ["name", "description", "buttonLabel"],
  syncFields: ["raised", "goal", "image", "buttonURL"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    raised: source.raised,
    goal: source.goal,
    image: source.image,
    buttonURL: source.buttonURL,
  }),

  modelName: "Campaign",
};

export default createAutoTranslateLifecycles(campaignConfig);