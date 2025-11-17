import { Button } from "@/components/ui/button";
import { Heart, Compass, Globe2 } from "lucide-react";

const general_application_url =
  "https://www.vomevolunteer.com/volunteer/form-details/application%20form/8e04abde-2c39-438e-a097-db1f71c459ac/profile";
const board_member_application_url =
  "https://www.vomevolunteer.com/volunteer/form-details/volunteer-20board-20member-20application/52483238-9e97-432f-adbc-c61bd8559e43/link?_branch_match_id=1412983189162399966&_branch_referrer=H4sIAAAAAAAAA8soKSkottLXL85ILErVK8vPTS3LzynNK0lNLdJLzs%2FVL4uKSnIzMy9LDUmyrytKTUstKsrMS49PKsovL04tsnXOKAJqAQC8oI5LRQAAAA%3D%3D";
const volunteer_opportunities_url =
  "https://www.vomevolunteer.com/organization-details/5ddf59c9-92ac-4daa-82c5-11f9c66b1d0b?/#home";

export default function VolunteerButtons() {
  return (
    <section aria-labelledby="volunteer-links-title" className="my-16 px-6">
      <h2
        id="volunteer-links-title"
        className="text-3xl font-semibold text-center mb-10 text-gray-900"
      >
        Get Involved Through VOME
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* General Application */}
        <div className="rounded-2xl border border-gray-200 shadow-sm bg-white p-6 flex flex-col">
          <div className="mb-4 flex justify-center">
            <span
              aria-hidden="true"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[var(--rh-100)] text-[var(--rh-500)]"
            >
              <Heart className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            General Application
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            Apply to become a volunteer and support newcomers across a variety
            of Reception House programs.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)]">
              <a
                href={general_application_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open General Application in a new tab"
              >
                Apply Now
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
              <Compass className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            Board Member Application
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            Join our leadership team and help guide the mission and long-term
            vision of Reception House.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)]">
              <a
                href={board_member_application_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Board Member Application in a new tab"
              >
                Apply to Board
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
              <Globe2 className="h-6 w-6" />
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 text-center">
            Opportunities
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed text-center">
            Explore current volunteer roles and discover where your skills can
            make the most impact.
          </p>
          <div className="mt-6 flex justify-center">
            <Button asChild className="bg-[var(--rh-500)] ">
              <a
                href={volunteer_opportunities_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Open Volunteer Opportunities in a new tab"
              >
                See Opportunities
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
