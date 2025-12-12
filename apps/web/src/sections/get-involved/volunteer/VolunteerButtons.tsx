import DynamicIcon from "@/components/common/DynamicIcon";
import { Button } from "@/components/ui/button";
import { IconCard } from "@/lib/strapi/models/common/iconCard";

export default function VolunteerButtons({
  title,
  card1,
  card2,
  card3
}: {
  title: string;
  card1: IconCard;
  card2: IconCard;
  card3: IconCard;
}) {
  return (
    <section aria-labelledby="volunteer-links-title" className="my-16 px-6">
      <h2
        id="volunteer-links-title"
        className="text-3xl font-semibold text-center mb-10 text-gray-900"
      >
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        
        {/* General Application */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col">
          <div className="mb-4 flex justify-center">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--rh-100)] text-[var(--rh-500)]"
            >
              <DynamicIcon name={card1.icon} className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            {card1.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {card1.description}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)]">
              <a
                href={card1.button.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open General Application in a new tab"
              >
                {card1.button.label}
              </a>
            </Button>
          </div>
        </div>

        {/* Board Member Application */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col">
          <div className="mb-4 flex justify-center">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--rh-red-100)] text-[var(--rh-red-500)]"
            >
              <DynamicIcon name={card2.icon} className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            {card2.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {card2.description}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)]">
              <a
                href={card2.button.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Board Member Application in a new tab"
              >
                {card2.button.label}
              </a>
            </Button>
          </div>
        </div>

        {/* Volunteer Opportunities */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col">
          <div className="mb-4 flex justify-center">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-gray-100 text-gray-900"
            >
              <DynamicIcon name={card3.icon} className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            {card3.title}
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            {card3.description}
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)] ">
              <a
                href={card3.button.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Volunteer Opportunities in a new tab"
              >
                {card3.button.label}
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
