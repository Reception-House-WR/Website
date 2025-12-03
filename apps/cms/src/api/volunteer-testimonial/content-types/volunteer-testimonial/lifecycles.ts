import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const volunteerTestimonialConfig: AutoTranslateConfig = {
  translatableFields: ["role", "quote"],
  syncFields: ["name", "image"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    name: source.name, 
    image: source.image
  }),

  modelName: "VolunteerTestimonial",
};

export default createAutoTranslateLifecycles(volunteerTestimonialConfig);