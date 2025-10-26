
 const barriers = [
    "Language barriers affecting academic performance and social connection",
    "Cultural adjustment challenges navigating Canadian school systems",
    "Trauma and mental health impacts from displacement experiences",
    "Limited extracurricular opportunities due to financial constraints"
  ];
  
export function Barriers(){
    return(
        <div className="bg-[var(--rh-red-500)]/10 p-8 rounded-2xl animate-fade-in transition-all duration-300 hover:shadow-soft">
            <h3 className="text-2xl font-bold text-foreground mb-4 animate-fade-in-up">Barriers Young Newcomers Face</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {barriers.map((barrier, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-in-up transition-transform duration-200 hover:translate-x-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--rh-red-500)] mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-sm text-black-foreground">{barrier}</p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-black-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              Our programs are designed to address these specific challenges, providing the resources and 
              support young people need to overcome barriers and reach their full potential.
            </p>
        </div>
    );
}