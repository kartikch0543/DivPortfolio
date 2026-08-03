"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="text-center">
        <p className="text-sm text-[var(--muted-foreground)]">Something went wrong.</p>
        <button
          className="mt-4 underline underline-offset-4"
          onClick={reset}
          type="button"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
