interface ProgramCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

export const ProgramCard = ({ title, description, imageSrc, imageAlt }: ProgramCardProps) => {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-smooth flex-1 w-full">
      <div className="aspect-video overflow-hidden">
        <img 
          src={imageSrc} 
          alt={imageAlt}
          className="w-full h-full object-cover hover:scale-105 transition-smooth"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 text-card-foreground">
          {title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </article>
  );
};