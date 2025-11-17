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
    title: Schema.Attribute.String;
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

export interface ProgramsAnalytics extends Struct.ComponentSchema {
  collectionName: 'components_programs_analytics';
  info: {
    displayName: 'analytics';
  };
  attributes: {
    description: Schema.Attribute.String;
    metric: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProgramsCards extends Struct.ComponentSchema {
  collectionName: 'components_programs_cards';
  info: {
    displayName: 'cards';
  };
  attributes: {
    cards: Schema.Attribute.Component<'common.card', true>;
  };
}

export interface ProgramsFeature extends Struct.ComponentSchema {
  collectionName: 'components_programs_features';
  info: {
    displayName: 'feature';
  };
  attributes: {
    description: Schema.Attribute.String;
    icon: Schema.Attribute.String;
    title: Schema.Attribute.String;
  };
}

export interface ProgramsInfoCard extends Struct.ComponentSchema {
  collectionName: 'components_programs_info_cards';
  info: {
    displayName: 'infoCard';
  };
  attributes: {
    description: Schema.Attribute.Text;
    items: Schema.Attribute.Component<'programs.item', true>;
    subtitle: Schema.Attribute.String;
    subtitle2: Schema.Attribute.String;
    title: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProgramsItem extends Struct.ComponentSchema {
  collectionName: 'components_programs_items';
  info: {
    displayName: 'item';
  };
  attributes: {
    value: Schema.Attribute.String & Schema.Attribute.Required;
  };
}

export interface ProgramsOurPrograms extends Struct.ComponentSchema {
  collectionName: 'components_programs_our_programs';
  info: {
    displayName: 'ourPrograms';
  };
  attributes: {
    bottomDescription: Schema.Attribute.Text;
    cards: Schema.Attribute.Component<'programs.info-card', true>;
    simpleCards: Schema.Attribute.Component<'common.card', true>;
    title: Schema.Attribute.String & Schema.Attribute.Required;
    topDescription: Schema.Attribute.Text & Schema.Attribute.Required;
  };
}

export interface ProgramsPartner extends Struct.ComponentSchema {
  collectionName: 'components_programs_partners';
  info: {
    displayName: 'partner';
  };
  attributes: {
    logo: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    name: Schema.Attribute.String;
    url: Schema.Attribute.String;
  };
}

export interface ProgramsPartnerSection extends Struct.ComponentSchema {
  collectionName: 'components_programs_partner_sections';
  info: {
    displayName: 'partnerSection';
  };
  attributes: {
    description: Schema.Attribute.Text;
    partners: Schema.Attribute.Component<'programs.partner', true>;
    title: Schema.Attribute.String;
  };
}

export interface ProgramsServiceOverview extends Struct.ComponentSchema {
  collectionName: 'components_programs_service_overviews';
  info: {
    displayName: 'serviceOverview';
  };
  attributes: {
    description: Schema.Attribute.Text;
    features: Schema.Attribute.Component<'programs.feature', true>;
    title: Schema.Attribute.String;
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
      'programs.analytics': ProgramsAnalytics;
      'programs.cards': ProgramsCards;
      'programs.feature': ProgramsFeature;
      'programs.info-card': ProgramsInfoCard;
      'programs.item': ProgramsItem;
      'programs.our-programs': ProgramsOurPrograms;
      'programs.partner': ProgramsPartner;
      'programs.partner-section': ProgramsPartnerSection;
      'programs.service-overview': ProgramsServiceOverview;
      'stories.stories-carousel': StoriesStoriesCarousel;
    }
  }
}
