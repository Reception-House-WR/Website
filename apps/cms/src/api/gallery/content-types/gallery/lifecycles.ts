
import {
  createAutoTranslateLifecycles,
  AutoTranslateConfig,
} from "../../../../utils/autoTranslate";

const galleryConfig: AutoTranslateConfig = {
  translatableFields: ["description"],
  syncFields: ["isImage", "image", "videoUrl"],

  buildBaseData: (source: any, _targetLocale: string) => ({
    isImage: source.isImage,
    image: source.image, 
    videoUrl: source.videoUrl
  }),

  modelName: "Gallery",
};

export default createAutoTranslateLifecycles(galleryConfig);