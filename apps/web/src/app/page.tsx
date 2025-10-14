// apps/web/src/app/page.tsx

"use client"; // This is crucial because we are using hooks (useState, useEffect)

import { Hero } from "./(home)/sections/Hero";
import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import '@/i18n'; // Make sure the i18n configuration is imported

// 1. Define the TypeScript type for your page data from Strapi
interface StrapiPage {
  id: number;
  attributes: {
    title: string;
    content: string; // This will be a string of HTML
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export default function Home() {
  // 2. Type the state to be either a StrapiPage object or null
  const [page, setPage] = useState<StrapiPage | null>(null);
  const { i18n } = useTranslation();

  useEffect(() => {
    const currentLanguage = i18n.language;

    async function fetchHomePage() {
      try {
        const response = await fetch(
          // This fetches the page with the slug "homepage" for the current language
          `http://localhost:1337/api/pages?filters[slug][$eq]=homepage&locale=${currentLanguage}`
        );
        const apiResponse: { data: StrapiPage[] } = await response.json();

        if (apiResponse.data && apiResponse.data.length > 0) {
          setPage(apiResponse.data[0]);
        } else {
          setPage(null); // No content found for this language
        }
      } catch (error) {
        console.error("Failed to fetch page:", error);
      }
    }

    fetchHomePage();
  }, [i18n.language]); // Re-run this code whenever the language changes

  // Display a loading message while fetching data
  // if (!page) {
  //   return <div>Loading content...</div>;
  // }

  // Render the fetched content
  return (
    <main>
      {/* 1. Render your hardcoded Hero component, but make it dynamic */}
      {/* It now gets the current language from our i18n state */}
      <Hero lang={i18n.language} />

      {/* 2. Render the dynamic content fetched from Strapi below the Hero */}
      {/* We add a check to only render this section if the 'page' data exists */}
      {page ? (
        <section className="container mx-auto px-4 py-8">
          <h1>{page.attributes.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: page.attributes.content }} />
        </section>
      ) : (
        // 3. Show a loading message while the content is being fetched
        <div className="container mx-auto px-4 py-8">Loading content...</div>
      )}
    </main>
  );
}
