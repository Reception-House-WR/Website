interface ServiceHeroProps {
  title: string;
  description: string;
}

export const ServiceHero = ({ title, description}: ServiceHeroProps) => {
  return (
    <section className="relative h-[40vh] overflow-hidden">
      <div className="absolute inset-0">
      
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--rh-500)]/90 to-[var(--rh-500)]/60" />
      </div>
      
      <div className="relative container mx-auto px-4 h-full flex items-center">
        <div className="max-w-3xl text-white animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            {title}
          </h1>
          <p className="text-xl md:text-2xl leading-relaxed opacity-95">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
};