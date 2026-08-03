import { cn } from "@/lib/utils";

type SectionProps = React.ComponentProps<"section">;

export function Section({ className, ...props }: SectionProps) {
  return <section className={cn("py-12 sm:py-16 lg:py-24", className)} {...props} />;
}
