// import StoriesClient from "../../sections/stories/StoriesClient";
import { fetchStoriesPage } from "@/lib/strapi/helpers/storiesHelper";
import StoriesClient from "@/sections/stories/StoriesClient";


export default async function StoriesPage({ params }: { params: { locale: string } }) {

  const res = await fetchStoriesPage(params.locale);
  // console.log("STORIES: ", res); 

  if (!res) {
    return <div>Failed to load data</div>;
  }

  return (
    <StoriesClient
      heroTitle={res.hero?.title || ""}
      heroDesc={res.hero?.description || ""}
      heroImage={res.hero?.backgroundImageUrl || ""}
      bodyTitle={res.body?.section?.title || ""}
      bodyDesc={res.body?.section?.description || ""}
      stories={res.body?.stories || []}
    />
  );
}