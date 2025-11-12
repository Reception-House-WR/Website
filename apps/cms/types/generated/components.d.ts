import type { Schema, Struct } from '@strapi/strapi';

export interface CommonButton extends Struct.ComponentSchema {
  collectionName: 'components_common_buttons';
  info: {
    displayName: 'Button';
  };
  attributes: {
    Label: Schema.Attribute.String;
    URL: Schema.Attribute.String;
  };
}

export interface CommonCarousel extends Struct.ComponentSchema {
  collectionName: 'components_common_carousels';
  info: {
    displayName: 'Carousel';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Direction: Schema.Attribute.Enumeration<['asc', 'desc']>;
    Limit: Schema.Attribute.Integer;
    SortBy: Schema.Attribute.Enumeration<['priority']>;
    Title: Schema.Attribute.String;
  };
}

export interface CommonHero extends Struct.ComponentSchema {
  collectionName: 'components_common_heroes';
  info: {
    displayName: 'Hero';
  };
  attributes: {
    BackgroundImage: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface CommonSection extends Struct.ComponentSchema {
  collectionName: 'components_common_sections';
  info: {
    displayName: 'section';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    Title: Schema.Attribute.String;
  };
}

export interface DonateCurrentCampaign extends Struct.ComponentSchema {
  collectionName: 'components_donate_current_campaigns';
  info: {
    displayName: 'CurrentCampaign';
  };
  attributes: {
    campaign: Schema.Attribute.Relation<'oneToOne', 'api::campaign.campaign'>;
    Title: Schema.Attribute.String;
  };
}

export interface StoriesStoriesCarousel extends Struct.ComponentSchema {
  collectionName: 'components_stories_stories_carousels';
  info: {
    displayName: 'stories-carousel';
  };
  attributes: {
    Description: Schema.Attribute.Text;
    stories: Schema.Attribute.Relation<'oneToMany', 'api::story.story'>;
    Title: Schema.Attribute.String;
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
