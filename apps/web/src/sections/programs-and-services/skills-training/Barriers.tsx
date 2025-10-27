

let barriers = [
    {
        title: "Housing Challenges",
        description: "Finding affordable, safe housing in an unfamiliar city without local references or credit history."
    }, 
    {
        title: "Employment Barriers",
        description: "Navigating credential recognition, gaining Canadian work experience, and understanding workplace culture."
    }, 
    {
        title: "Language & Cultural Adjustment",
        description: "Learning a new language while adapting to Canadian systems, values, and social norms."
    }

]
export default function Barriers(){
    return (
        <section className="py-20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-16">
            <h2 className="text-4xl font-bold mb-8 text-foreground text-center">
              Overcoming Barriers Together
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground mb-6">
              When refugees and immigrants arrive in Canada, they face numerous challenges as they work 
              to rebuild their lives in a new country. Understanding these barriers is the first step in 
              providing effective support.
            </p>
            <div className="grid md:grid-cols-3 gap-6 mt-12">
            {barriers.map((barrier, index) => (
                <div className="bg-card rounded-lg p-6 shadow-soft">
                <h3 className="text-xl font-semibold mb-3 text-card-foreground">{barrier.title}</h3>
                <p className="text-muted-foreground">
                  {barrier.description}
                </p>
              </div>
            ))}
            </div>
          </div>
        </div>
        </section>
    );
}