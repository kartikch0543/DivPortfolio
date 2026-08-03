import Link from "next/link";
import { FolderOpen } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";

type EmptyStateProps = {
  title: string;
  description: string;
  action?: { label: string; href: string };
};
export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <section className="border-border bg-surface rounded-lg border border-dashed p-10 text-center">
      <FolderOpen aria-hidden="true" className="text-secondary mx-auto size-7" />
      <h2 className="mt-4 text-lg font-semibold">{title}</h2>
      <p className="text-muted-foreground mx-auto mt-2 max-w-md text-sm leading-6">
        {description}
      </p>
      {action ? (
        <Link className={`${buttonVariants()} mt-5`} href={action.href}>
          {action.label}
        </Link>
      ) : null}
    </section>
  );
}
