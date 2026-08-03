import { cn } from "@/lib/utils";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function PageHeader({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow ? (
        <p className="font-pixel text-secondary text-xs tracking-[0.16em] uppercase">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-pixel text-foreground mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl">
        {title}
      </h1>
      {description ? (
        <p className="text-muted-foreground mt-5 text-base leading-7 sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
