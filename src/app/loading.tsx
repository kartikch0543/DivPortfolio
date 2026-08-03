export default function Loading() {
  return (
    <main aria-busy="true" className="grid min-h-screen place-items-center p-6">
      <p className="text-sm text-[var(--muted-foreground)]">Loading…</p>
    </main>
  );
}
