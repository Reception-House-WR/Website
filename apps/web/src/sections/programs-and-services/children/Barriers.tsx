
export function Barriers({
  title,
  desc,
  barriers
}: {
  title: string;
  desc: string;
  barriers: {
        key: string;
        value: string;
    }[];
}){
    return(
        <div className="bg-[var(--rh-red-500)]/10 p-8 rounded-2xl animate-fade-in transition-all duration-300 hover:shadow-soft">
            <h3 className="text-2xl font-bold text-foreground mb-4 animate-fade-in-up">{title}</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {barriers.map((barrier, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-3 animate-fade-in-up transition-transform duration-200 hover:translate-x-2"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-2 h-2 rounded-full bg-[var(--rh-red-500)] mt-2 flex-shrink-0 animate-pulse"></div>
                  <p className="text-sm text-black-foreground">
                    <strong className="text-foreground">
                      {barrier.key}
                    </strong>{" "}
                    {barrier.value}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-black-foreground animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {desc}
            </p>
        </div>
    );
}