
const rapList = [
  {
    title: "Orientation to Canada",
    description: "Understanding Canadian systems, laws, rights, and responsibilities",
  },
  {
    title: "Essential Life Skills",
    description: "Banking, transportation, healthcare access, and emergency services",
  },
  {
    title: "Immediate Support",
    description: "Help with documentation, ID applications, and connecting to services",
  },
  {
    title: "Community Connection",
    description: "Introduction to local resources, communities, and support networks",
  },
];


const cssList = [
  {
    title: "Language Training",
    description:
      "Comprehensive English language classes at various proficiency levels",
  },
  {
    title: "Employment Preparation",
    description:
      "Job search skills, resume writing, and workplace integration support",
  },
  {
    title: "Cultural Integration",
    description:
      "Understanding Canadian culture while maintaining cultural identity",
  },
  {
    title: "Mentorship & Community Building",
    description:
      "Connecting with mentors and building lasting community relationships",
  },
];
export default function RapAndCss(){
    return(
        <section className="py-20 bg-gradient-warm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <div className="inline-block bg-[var(--rh-green-500)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
                Weeks 1-4
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                RAP Training: First Few Weeks
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Refugee Assistance Program (RAP) provides essential orientation and support during 
                the critical first weeks after arrival.
              </p>
              
              <ul className="space-y-4">
                {rapList.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[var(--rh-green-500)] text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium">
                        {index + 1}
                    </div>
                    <div>
                        <strong className="text-foreground">{item.title}:</strong>
                        <p className="text-muted-foreground">{item.description}</p>
                    </div>
                    </li>
                ))}
                </ul>
              
              <div className="pt-4">
                <img 
                  src="/assets/rap.jpg" 
                  alt="Instructor helping students during orientation session"
                  className="rounded-lg shadow-soft w-full"
                />
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="inline-block bg-[var(--rh-red-500)] text-white px-4 py-2 rounded-full text-sm font-semibold mb-2">
                First Year
              </div>
              <h2 className="text-3xl font-bold text-foreground">
                CSS Training: Long-Term Integration
              </h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                The Community Settlement Services (CSS) program provides ongoing support throughout 
                the first year and beyond.
              </p>
              
              <ul className="space-y-4">
            {cssList.map((item, idx) => (
                <li key={item.title} className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[var(--rh-red-500)] text-white flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium">
                    {idx + 1}
                </div>
                <div>
                    <strong className="text-foreground">{item.title}:</strong>
                    <p className="text-muted-foreground">{item.description}</p>
                </div>
                </li>
            ))}
            </ul>
              
              <div className="pt-4">
                <img 
                  src="/assets/css.jpg"
                  alt="Group of diverse adults engaged in language class"
                  className="rounded-lg shadow-soft w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}