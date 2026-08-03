import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p className="font-pixel text-secondary text-xs tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-foreground mt-3 text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-muted-foreground mt-3 leading-7">{description}</p>
      ) : null}
    </div>
  );
}
