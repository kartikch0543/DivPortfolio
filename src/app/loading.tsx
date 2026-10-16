export default function Loading() {
  return (
    <main aria-label="KD Arcade" className="grid min-h-screen place-items-center p-6 bg-brand-cream text-brand-primary">
      <div className="flex flex-col items-center gap-3">
        <div className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full animate-spin" />
        <span className="text-[0.68rem] font-mono tracking-[0.25em] uppercase font-bold opacity-80">
          divyanshu.
        </span>
      </div>
    </main>
  );
}
