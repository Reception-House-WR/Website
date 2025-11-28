import Img from 'next/image'
interface ProgramCardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt?: string;
}

export const ProgramCard = ({ title, description, imageSrc, imageAlt }: ProgramCardProps) => {
  return (
    <article className="bg-card rounded-lg overflow-hidden shadow-soft hover:shadow-hover transition-smooth flex-1 w-full">
      <div className="relative aspect-video overflow-hidden">
        {(imageSrc && <Img
          src={imageSrc}
          alt={imageAlt || title}
          fill
          className="object-cover hover:scale-105 transition-smooth"
        />)}
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