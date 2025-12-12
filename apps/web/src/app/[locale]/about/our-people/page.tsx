import { Users } from "lucide-react"; // Icon for Hero section
import TeamDirectory from "../../../../components/common/TeamDirectory"; // Client Component for interactive directory
import { fetchAboutOurPeoplePage } from "@/lib/strapi/helpers/about/aboutOurPeopleHelper";
import Image from "next/image";

export default async function OurPeople({ params }: { params: { locale: string } }) {
  const res = await fetchAboutOurPeoplePage(params.locale);
  // console.log("res:", res);

  if (!res) {
    return (
      <div className="flex items-center justify-center py-5">
        Error loading Our People page data.
      </div>
    );
  }

  return (
    <>
      {/*Hero Section*/}
      <section
        className="relative h-[40vh] min-h-[300px] overflow-hidden bg-gray-200"
        role="banner"
      >
        <div className="absolute inset-0 z-0">
          {res.hero?.backgroundImageUrl && (
            <Image
              src={res.hero.backgroundImageUrl}
              alt="Hero background"
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
          )}

          <div
            className="absolute inset-0"
            style={{ background: "var(--hero-gradient)" }}
          />
        </div>
        {/* Hero Content */}
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-black/30 backdrop-blur-sm rounded-full mb-4">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {res.hero?.title}
            </h1>
            <p className="text-xl text-white/90">{res.hero?.description}</p>
          </div>
        </div>
      </section>

      {/*Team Directory */}
      <TeamDirectory departments={res?.departments || []} employees={res?.people || []} />
    </>
  );
}
