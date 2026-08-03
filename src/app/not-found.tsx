import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <section className="text-center">
        <p className="text-sm text-[var(--muted-foreground)]">404</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight">Page not found</h1>
        <Link className="mt-4 inline-block underline underline-offset-4" href="/">
          Return home
        </Link>
      </section>
    </main>
  );
}
