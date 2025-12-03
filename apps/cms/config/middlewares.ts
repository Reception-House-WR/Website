// apps/cms/config/middlewares.ts
export default [
  'strapi::logger',
  'strapi::errors',
  {
    name: 'strapi::security',
    config: {
      contentSecurityPolicy: {
        useDefaults: true,
        directives: {
          // Allow Strapi to fetch images, videos, and other media from Azure Blob Storage
          'connect-src': ["'self'", 'https:'],
          'img-src': ["'self'", 'data:', 'blob:', '*.blob.core.windows.net'],
          'media-src': ["'self'", 'data:', 'blob:', '*.blob.core.windows.net'],
          'frame-src': ["'self'", 'https:'],
        },
      },
    },
  },
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];
