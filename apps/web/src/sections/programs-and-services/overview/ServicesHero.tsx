
export default function ServicesHero(){
    return (
        <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
            <img 
            src="assets/images/services-hero.jpg"
            alt="Diverse community members engaging in welcoming activities" 
            className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 container mx-auto px-6 py-20 max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-fade-in-up">
            Supporting New Beginnings Through Care and Connection
            </h1>
            <p className="text-xl md:text-2xl text-white/95 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            At Reception House Waterloo Region, we help refugees and newcomers build meaningful lives in Canada. 
            Through compassionate support, tailored programs, and strong community partnerships, we guide individuals 
            and families through every step of their settlement journey—from their first days in Canada to long-term 
            integration and success.
            </p>
        </div>
        </section>
    );
}