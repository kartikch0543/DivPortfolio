import { cn } from "@/lib/utils";

export function Input({
  className,
  type = "text",
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      className={cn(
        "border-border bg-surface text-foreground placeholder:text-muted-foreground focus:border-ring focus:ring-ring/25 flex h-10 w-full rounded-md border px-3 py-2 text-sm shadow-sm outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      type={type}
      {...props}
    />
  );
}
