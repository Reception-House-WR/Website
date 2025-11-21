export const HeroSection = ({
  title,
  desc
}: {
  title: string;
  desc: string;
}) => {
  return (
    <section 
      className="relative overflow-hidden bg-gradient-to-br from-[var(--rh-500)] to-[var(--rh-500)]/80 py-20 md:py-28"
      role="banner"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <p className="text-lg text-primary-foreground/95 md:text-xl leading-relaxed">
            {desc}
          </p>
        </div>
      </div>
    
    </section>
  )
}
