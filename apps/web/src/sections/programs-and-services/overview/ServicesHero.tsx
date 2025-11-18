
export default function ServicesHero({
    title,
    desc,
    url
}: {
    title: string;
    desc: string;
    url?: string;
}){
    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            {(url && <img 
            src={url}
            alt="Diverse community members engaging in welcoming activities" 
            className="w-full h-full object-cover"
            />)}
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--rh-500)]/90 via-[var(--rh-500)]/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                {title}
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                {desc}
            </p>
        </div>
        </section>
    );
}