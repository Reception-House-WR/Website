// src/api/page/lifecycles.js
const axios = require('axios');

// Helper function to call the DeepL API
const translateText = async (text, targetLang) => {
  // For the free API, use api-free.deepl.com
  const endpoint = 'https://api-free.deepl.com/v2/translate';
  try {
    const response = await axios.post(endpoint, {
      text: [text],
      target_lang: targetLang.toUpperCase(), // DeepL expects uppercase language codes (e.g., 'FR', 'ES')
    }, {
      headers: {
        'Authorization': `DeepL-Auth-Key ${process.env.DEEPL_API_KEY}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data.translations[0].text;
  } catch (error) {
    console.error('DeepL Translation Error:', error.response ? error.response.data : error.message);
    return null; // Return null on error
  }
};

module.exports = {
  async afterCreate(event) {
    const { result } = event;

    // Only run this logic if the content was created in the default locale (English)
    if (result.locale === 'en') {
      // 1. Get all other locales configured in Strapi
      const locales = await strapi.service('plugin::i18n.locales').find();
      const otherLocales = locales.filter(locale => locale.code !== 'en');

      // 2. Define which fields to translate
      // !!! IMPORTANT: Change these to match the fields in your content type !!!
      const fieldsToTranslate = ['title', 'content'];

      // 3. Loop through each locale and translate
      for (const locale of otherLocales) {
        const translatedEntry = {
          ...result, // Copy non-translatable fields
          locale: locale.code,
          localizations: [result.id], // Link to the original English entry
        };

        for (const field of fieldsToTranslate) {
          if (result[field]) {
            const translatedText = await translateText(result[field], locale.code);
            if (translatedText) {
              translatedEntry[field] = translatedText;
            }
          }
        }

        // 4. Create the new localized entry in Strapi
        await strapi.service('api::page.page').create({ data: translatedEntry });
      }
    }
  },

  // You can add a similar `afterUpdate` hook if you want updates to trigger re-translation
};