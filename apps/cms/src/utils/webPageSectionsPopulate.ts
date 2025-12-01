export const webPageSectionsPopulate = {
  sections: {
    on: {
      "stories.stories-carousel": {
        populate: {
          stories: {
            populate: {
              image: true,
            },
          },
        },
      },
      "donate.current-campaign": {
        populate: {
          campaign: {
            populate: {
              image: true,
            },
          },
        },
      },
      "common.hero": {
        populate: {
          backgroundImage: true,
        },
      },
      "common.section": true,
      "programs.analytics-section": {
        populate: {
          analytics: true,
        },
      },
      "programs.info-card": {
        populate: {
          items: true,
        },
      },
      "common.cards-carousel": {
        populate: {
          cards: {
            populate: {
              image: true,
            },
          },
        },
      },
      "common.gallery-carousel": {
        populate: {
          gallery: true,
        },
      },
      "about.impact": true,
      "common.list-card": {
        populate: {
          items: true,
        },
      },
      "programs.benefits-section": {
        populate: {
          card: {
            populate: {
              items: true,
            },
          },
        },
      },
      "programs.french-overview": {
        populate: {
          cards: {
            populate: {
              items: true,
            },
          },
        },
      },
      "programs.program-card": {
        populate: {
          steps: true,
          image: true,
        },
      },
      "programs.service-overview": {
        populate: {
          features: true,
        },
      },
      "programs.partner-section": {
        populate: {
          partners: {
            populate: {
              logo: true,
            },
          },
        },
      },
      "programs.analytics-overview": {
        populate: {
          analytics: true,
        },
      },
      "programs.cards": {
        populate: {
          cards: {
            populate: {
              image: true,
            },
          },
        },
      },
      "programs.our-programs": {
        populate: {
          cards: {
            populate: {
              items: true,
            },
          },
        },
      },
    },
  },
} as const;
