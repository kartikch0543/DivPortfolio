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
        <p className="font-pixel text-purple-600 dark:text-pink-400 text-xs tracking-[0.16em] uppercase font-bold">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-pixel dark:text-white text-slate-900 mt-4 text-3xl leading-tight sm:text-4xl lg:text-5xl font-bold">
        {title}
      </h1>
      {description ? (
        <p className="dark:text-slate-400 text-slate-600 mt-4 text-base leading-relaxed sm:text-lg">
          {description}
        </p>
      ) : null}
    </header>
  );
}
