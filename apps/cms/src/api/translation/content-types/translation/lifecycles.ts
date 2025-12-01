import { runAutotranslateAll } from "../../../../utils/translateAll";

export default {
  async afterCreate(event) {
    const { result } = event;

    strapi.log.info(
      `[autoTranslate:translation-job] Triggered from job id=${result.id}, version=${result.version}`
    );

    await runAutotranslateAll();
  },
};