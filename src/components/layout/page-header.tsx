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
        <p className="text-[0.7rem] font-mono text-brand-primary tracking-[0.18em] uppercase font-bold opacity-75">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="text-brand-primary mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl font-bold tracking-tight">
        {title}
      </h1>
      {description ? (
        <p className="text-brand-primary mt-4 text-base leading-relaxed sm:text-lg opacity-80">
          {description}
        </p>
      ) : null}
    </header>
  );
}
