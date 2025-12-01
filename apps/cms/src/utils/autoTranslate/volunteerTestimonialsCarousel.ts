// src/utils/autoTranslate/webPage/volunteerTestimonialsCarousel.ts
import { translateText } from "../translator";
import { SOURCE_LOCALE } from "../autoTranslate";
import type { WebPageSection } from "./index";

export const VOLUNTEER_TESTIMONIALS_CAROUSEL_UID = "get-involved.volunteer-testimonials-carousel";
const VOLUNTEER_TESTIMONIAL_MODEL_UID = "api::volunteer-testimonial.volunteer-testimonial";

type StrapiId = string | number;

async function findLocalizedVolunteerTestimonialId(
  testimonial: any,
  targetLocale: string
): Promise<StrapiId | null> {
  if (!testimonial) return null;

  const documentId = testimonial.documentId;
  if (!documentId) {
    return typeof testimonial.id === "number" ? testimonial.id : null;
  }

  const [target] = await strapi.entityService.findMany(
    VOLUNTEER_TESTIMONIAL_MODEL_UID,
    {
      filters: {
        documentId,
        locale: targetLocale,
      },
      limit: 1,
    }
  );

  if (!target) return null;
  return target.id;
}

/**
 * Translator for VolunteerTestimonialsCarousel
 * - Translates: title, description
 * - Maps relation "testimonials" to same volunteer-testimonials in target locale
 */
export async function translateVolunteerTestimonialsCarouselSection(
  section: WebPageSection,
  targetLocale: string
): Promise<WebPageSection> {
  const result: WebPageSection = {
    __component: VOLUNTEER_TESTIMONIALS_CAROUSEL_UID,
  };

  // title
  if (typeof section.title === "string" && section.title.trim().length > 0) {
    result.title = await translateText(section.title, SOURCE_LOCALE, targetLocale);
  } else {
    result.title = section.title ?? "";
  }

  // description
  if (
    typeof section.description === "string" &&
    section.description.trim().length > 0
  ) {
    result.description = await translateText(
      section.description,
      SOURCE_LOCALE,
      targetLocale
    );
  } else {
    result.description = section.description ?? "";
  }

  // testimonials relation
  const testimonials = Array.isArray((section as any).testimonials)
    ? (section as any).testimonials
    : [];

  const localizedIds: number[] = [];
  for (const testimonial of testimonials) {
    const id = await findLocalizedVolunteerTestimonialId(
      testimonial,
      targetLocale
    );
    if (id !== null) {
      localizedIds.push(Number(id));
    }
  }

  (result as any).testimonials = localizedIds;

  // copy other fields
  for (const key of Object.keys(section)) {
    if (
      key === "__component" ||
      key === "title" ||
      key === "description" ||
      key === "testimonials" ||
      key === "id"
    ) {
      continue;
    }
    (result as any)[key] = (section as any)[key];
  }

  return result;
}
