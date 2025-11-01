export default function HeroGetInvolved() {
    return (
        <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden" aria-labelledby="hero-heading">
        <div className="absolute inset-0 z-0">
          <img 
            src="/assets/get-involved.jpg"
            alt="Diverse community members gathering together and sharing a meal" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0" style={{ background: 'var(--hero-gradient)' }} aria-hidden="true" />
        </div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 id="hero-heading" className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Join Our Community
          </h1>
          <p className="text-xl md:text-2xl text-white/95 max-w-3xl mx-auto">
            Together, we create a welcoming community where refugees and newcomers can thrive. 
            Your involvement makes a lasting difference.
          </p>
        </div>
      </section>
);
}