
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const eventConfig: AutoTranslateConfig = {
  translatableFields: ["title", "description"],
  syncFields: ["date", "time", "location", "isPaid", "eventBriteURL", "image"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    date: source.date,
    time: source.time,
    location: source.location, 
    isPaid: source.isPaid,
    eventBriteURL: source.eventBriteURL, 
    image: source.image
  }),

  modelName: "Event",
};

export default createAutoTranslateLifecycles(eventConfig);