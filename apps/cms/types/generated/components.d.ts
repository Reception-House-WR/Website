import type { Schema, Struct } from '@strapi/strapi';

export interface AboutImpact extends Struct.ComponentSchema {
  collectionName: 'components_about_impacts';
  info: {
    displayName: 'impact';
  };
  attributes: {
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    videoUrl: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

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

export interface CommonCard extends Struct.ComponentSchema {
  collectionName: 'components_common_cards';
  info: {
    displayName: 'card';
    icon: 'file';
  };
  attributes: {
    buttonLabel: Schema.Attribute.String;
    buttonURL: Schema.Attribute.String;
    description: Schema.Attribute.Text & Schema.Attribute.Required;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
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

export interface CommonGalleryCarousel extends Struct.ComponentSchema {
  collectionName: 'components_common_gallery_carousels';
  info: {
    displayName: 'galleryCarousel';
  };
  attributes: {
    description: Schema.Attribute.Text;
    gallery: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
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
      'about.impact': AboutImpact;
      'common.button': CommonButton;
      'common.card': CommonCard;
      'common.carousel': CommonCarousel;
      'common.gallery-carousel': CommonGalleryCarousel;
      'common.hero': CommonHero;
      'common.section': CommonSection;
      'donate.current-campaign': DonateCurrentCampaign;
      'stories.stories-carousel': StoriesStoriesCarousel;
    }
  }
}
