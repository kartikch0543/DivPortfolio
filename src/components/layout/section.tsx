import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-8 sm:py-12 lg:py-16", className)} {...props} />;
}
