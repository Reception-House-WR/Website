import { fetchApi } from "./client";
import { getStrapiMedia } from "./utils";
import type {
  HeroData,
  Employee,
  TextSectionData,
  TimelineEvent,
  Event,
  Story,
  Campaign,
  DonationCategory,
  DonatePageData,
  DonationProgram,
  StrapiResponse,
  PageHeroDirectAttributes,
  EmployeeDirectAttributes,
  TextSectionDirectAttributes,
  TimelineEventDirectAttributes,
  EventDirectAttributes,
  StoryDirectAttributes,
  CampaignDirectAttributes,
  DonationCategoryDirectAttributes,
  DonatePageDirectAttributes,
  DonationProgramDirectAttributes,
} from "./types";

/**
 * Fetches hero content for a specific page identifier.
 * @param identifier The unique identifier for the page hero entry.
 * @returns HeroData object or null.
 */
export async function fetchPageHero(
  identifier: string
): Promise<HeroData | null> {
  const path = "/api/page-heroes";
  const params = {
    filters: { pageIdentifier: { $eq: identifier } },
    populate: { backgroundImage: true },
  };

  const json = await fetchApi<StrapiResponse<PageHeroDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data || json.data.length === 0) {
    console.warn(`No page hero found for identifier: ${identifier}`);
    return null;
  }

  const heroAttributes = json.data[0];
  const imageUrl = getStrapiMedia(heroAttributes.backgroundImage);

  return {
    title: heroAttributes.title || "Default Title",
    description: heroAttributes.description || "Default description.",
    imageUrl: imageUrl || "/assets/default-hero.jpg", // Fallback image
  };
}

/**
 * Fetches a unique, sorted list of department names from employee data.
 * Includes "All" as the first item.
 * @returns Array of department strings.
 */
export async function fetchDepartments(): Promise<string[]> {
  const path = "/api/employees";
  const params = {
    fields: ["department"],
    pagination: { pageSize: 1000 },
  };

  const json = await fetchApi<StrapiResponse<{ department: string }>>(
    path,
    params
  );

  if (!json || !json.data) {
    console.warn(
      "No department data returned from Strapi for fetchDepartments."
    );
    return ["All"];
  }

  const departmentNames = json.data
    .map((item) => item.department)
    .filter((dept): dept is string => !!dept);

  const uniqueDepartments = Array.from(new Set(departmentNames)).sort();

  return ["All", ...uniqueDepartments];
}

/**
 * Fetches the list of all published employees, sorted by name.
 * @returns Array of Employee objects or null on error (returns empty array if no data found).
 */
export async function fetchEmployees(): Promise<Employee[] | null> {
  const path = "/api/employees";
  const params = {
    populate: { imageUrl: true },
    sort: ["name:asc"],
    pagination: { pageSize: 100 },
  };

  const json = await fetchApi<StrapiResponse<EmployeeDirectAttributes>>(
    path,
    params
  );

  if (!json) return null;
  if (!json.data) {
    console.warn("No employee data array returned from Strapi.");
    return [];
  }

  const employees: Employee[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.imageUrl);
    return {
      id: item.id,
      name: item.name || "Unknown",
      role: item.role || "Unknown",
      department: item.department || "Unknown",
      email: item.email || "Unknown",
      imageUrl: imageUrl,
    };
  });

  return employees;
}

/**
 * Fetches a specific Text Section entry based on its identifier.
 * @param identifier The unique identifier for the text section entry.
 * @returns TextSectionData object or null.
 */
export async function fetchTextSection(
  identifier: string
): Promise<TextSectionData | null> {
  const path = "/api/text-sections";
  const params = {
    filters: { sectionIdentifier: { $eq: identifier } },
  };

  const json = await fetchApi<StrapiResponse<TextSectionDirectAttributes>>(
    path,
    params
  );

  if (!json || !json.data || json.data.length === 0) {
    console.warn(`No text section found for identifier: ${identifier}`);
    return null;
  }

  const sectionAttributes = json.data[0];

  return {
    title: sectionAttributes.title || `Title for ${identifier}`,
    description:
      sectionAttributes.description || `Description for ${identifier}`,
  };
}

/**
 * Fetches all published Timeline Events, sorted by the 'order' field.
 * @returns Array of TimelineEvent objects or null on error (returns empty array if no data found).
 */
export async function fetchTimelineEvents(): Promise<TimelineEvent[] | null> {
  const path = "/api/timeline-events";
  const params = {
    sort: ["order:asc"],
    populate: { image: true },
    pagination: { pageSize: 50 },
  };

  const json = await fetchApi<StrapiResponse<TimelineEventDirectAttributes>>(
    path,
    params
  );

  if (!json) return null;
  if (!json.data) {
    console.warn("No timeline event data array returned from Strapi.");
    return [];
  }

  const timelineEvents: TimelineEvent[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);
    return {
      year: item.year || "Unknown Year",
      title: item.title || "Untitled Event",
      description: item.description || "",
      imageUrl: imageUrl,
      order: item.order || 0,
    };
  });

  return timelineEvents;
}

/**
 * @returns Array of Event objects or null on error (returns empty array if no data found).
 */
export async function fetchEvents(): Promise<Event[] | null> {
  const path = "/api/events";
  const params = {
    sort: ["date:desc"],
    populate: { image: true },
    pagination: { pageSize: 100 },
  };

  const json = await fetchApi<StrapiResponse<EventDirectAttributes>>(
    path,
    params,
    {
      cache: "no-store",
    }
  );

  if (!json) return null;
  if (!json.data) {
    console.warn("No event data array returned from Strapi.");
    return [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const events: Event[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);

    const eventDate = new Date(item.date);
    const category = eventDate < today ? "past" : "upcoming";

    return {
      title: item.title || "Untitled Event",
      description: item.description || "",
      date: item.date,
      time: item.time || "TBD",
      location: item.location || "TBD",
      image: imageUrl,
      category: category,
      isPaid: item.isPaid || false,
      eventbriteUrl: item.eventbriteUrl,
    };
  });

  return events;
}

// lib/strapi/services.ts

/**
 * Fetches all published Stories, sorted by publish date.
 * @returns Array of Story objects or null on error.
 */
export async function fetchStories(): Promise<Story[] | null> {
  const path = "/api/stories";
  const params = {
    sort: ["publishedAt:desc"],
    populate: { image: true },
    pagination: { pageSize: 10 }, // Get the 10 most recent stories
  };

  const json = await fetchApi<StrapiResponse<StoryDirectAttributes>>(
    path,
    params
    // No 'next' block needed, we are using time-based revalidation
  );

  if (!json) return null;
  if (!json.data) {
    console.warn("No story data array returned from Strapi.");
    return [];
  }

  const stories: Story[] = json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);
    return {
      id: item.id,
      name: item.name || "Unnamed",
      story: item.story || "No story provided.",
      videoUrl: item.videoUrl || "#",
      image: imageUrl,
      imageAlt: item.image?.alternativeText || `A photo of ${item.name}`,
    };
  });

  return stories;
}

// lib/strapi/services.ts

/**
 * Fetches all published Campaigns.
 */
export async function fetchCampaigns(): Promise<Campaign[] | null> {
  const path = "/api/campaigns";
  const params = {
    sort: ["publishedAt:desc"],
    populate: { image: true },
  };
  const json = await fetchApi<StrapiResponse<CampaignDirectAttributes>>(
    path,
    params
  );
  if (!json?.data) return null;

  return json.data.map((item) => {
    const imageUrl = getStrapiMedia(item.image);
    return {
      id: item.id,
      name: item.name || "Untitled Campaign",
      description: item.description || "",
      image: imageUrl,
      imageAlt: item.image?.alternativeText || `Image for ${item.name}`,
    };
  });
}

/**
 * Fetches all published Donation Categories, sorted by 'order',
 * and populates their related In-Kind Items.
 */
export async function fetchDonationCategories(): Promise<
  DonationCategory[] | null
> {
  const path = "/api/donation-categories";
  const params = {
    sort: ["order:asc"],
    populate: ["inKindItems"],
  };
  const json = await fetchApi<StrapiResponse<DonationCategoryDirectAttributes>>(
    path,
    params
  );
  if (!json?.data) return null;

  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    emoji: item.emoji,
    color: item.color,
    // This simplifies the nested 'data' array from Strapi
    items: item.inKindItems?.data || [],
  }));
}

export async function fetchDonatePage(): Promise<DonatePageData | null> {
  const path = "/api/donate-page";

  // We expect a single data object, not an array
  const json = await fetchApi<{ data: DonatePageDirectAttributes }>(path, {});

  // Check if the data object itself is null or undefined
  if (!json?.data) {
    console.warn(
      "No data found for Donate Page. Make sure it is created and published in Strapi."
    );
    return null;
  }

  // Access 'json.data' directly as an object
  return {
    dropOffInfo: json.data.dropOffInfo || "",
    thriftPartners: json.data.thriftPartners || "",
  };
}

// lib/strapi/services.ts
// ... (add DonationProgramDirectAttributes, DonationProgram to your types import)

/**
 * Fetches all published Donation Programs, sorted by the 'order' field.
 */
export async function fetchDonationPrograms(): Promise<
  DonationProgram[] | null
> {
  const path = "/api/donation-programs";
  const params = {
    sort: ["order:asc"], // Sort by the order field
  };
  const json = await fetchApi<StrapiResponse<DonationProgramDirectAttributes>>(
    path,
    params
  );
  if (!json?.data) return null;

  return json.data.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    buttonText: item.buttonText,
    iconName: item.iconName,
  }));
}
