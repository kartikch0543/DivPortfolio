export function GameControls({ controls }: { controls: string[] }) {
  return (
    <section aria-labelledby="controls-heading">
      <h2 id="controls-heading" className="text-2xl font-semibold">
        Controls
      </h2>
      <ul className="mt-4 grid gap-2 sm:grid-cols-2">
        {controls.map((control) => (
          <li
            className="border-border bg-surface rounded-md border px-3 py-2 text-sm"
            key={control}
          >
            {control}
          </li>
        ))}
      </ul>
    </section>
  );
}
