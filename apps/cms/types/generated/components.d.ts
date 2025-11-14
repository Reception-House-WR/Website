import type { Schema, Struct } from '@strapi/strapi';

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'button';
  };
  attributes: {
    label: Schema.Attribute.String & Schema.Attribute.Required;
    url: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonCarousel extends Struct.ComponentSchema {
  collectionName: 'components_common_carousels';
  info: {
    displayName: 'carousel';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    direction: Schema.Attribute.Enumeration<['asc', 'desc']>;
    limit: Schema.Attribute.Integer;
    sortBy: Schema.Attribute.Enumeration<['priority']>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonHero extends Struct.ComponentSchema {
  collectionName: 'components_common_heroes';
  info: {
    displayName: 'hero';
  };
  attributes: {
    backgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface CommonSection extends Struct.ComponentSchema {
  collectionName: 'components_common_sections';
  info: {
    displayName: 'section';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface DonateCurrentCampaign extends Struct.ComponentSchema {
  collectionName: 'components_donate_current_campaigns';
  info: {
    displayName: 'currentCampaign';
  };
  attributes: {
    campaign: Schema.Attribute.Relation<'oneToOne', 'api::campaign.campaign'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface StoriesStoriesCarousel extends Struct.ComponentSchema {
  collectionName: 'components_stories_stories_carousels';
  info: {
    displayName: 'storiesCarousel';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    stories: Schema.Attribute.Relation<'oneToMany', 'api::story.story'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'common.button': CommonButton;
      'common.carousel': CommonCarousel;
      'common.hero': CommonHero;
      'common.section': CommonSection;
      'donate.current-campaign': DonateCurrentCampaign;
      'stories.stories-carousel': StoriesStoriesCarousel;
    }
  }
}
