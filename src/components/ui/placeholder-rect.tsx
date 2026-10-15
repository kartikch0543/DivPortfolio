import React from "react";

interface PlaceholderRectProps {
  label?: string;
  sublabel?: string;
  aspectRatio?: string; // e.g. "aspect-[4/3]", "aspect-[16/9]", "aspect-[3/4]"
  className?: string;
  children?: React.ReactNode;
}

export function PlaceholderRect({
  label = "MEDIA PLACEHOLDER",
  sublabel,
  aspectRatio = "aspect-video",
  className = "",
  children,
}: PlaceholderRectProps) {
  return (
    <div
      className={`placeholder-rect placeholder-crosshair relative w-full overflow-hidden select-none ${aspectRatio} ${className}`}
    >
      {/* Corner technical crosshairs */}
      <span className="absolute top-2 left-2 text-[0.6rem] font-mono tracking-widest text-brand-primary/40 uppercase">
        +
      </span>
      <span className="absolute top-2 right-2 text-[0.6rem] font-mono tracking-widest text-brand-primary/40 uppercase">
        +
      </span>
      <span className="absolute bottom-2 left-2 text-[0.6rem] font-mono tracking-widest text-brand-primary/40 uppercase">
        +
      </span>
      <span className="absolute bottom-2 right-2 text-[0.6rem] font-mono tracking-widest text-brand-primary/40 uppercase">
        +
      </span>

      {/* Center Label & Dimensions */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 text-center">
        <span className="inline-block border border-brand-primary/30 bg-brand-cream/80 px-2 py-0.5 text-[0.62rem] font-mono tracking-[0.18em] uppercase text-brand-primary">
          [ {label} ]
        </span>
        {sublabel ? (
          <span className="mt-1.5 text-[0.6rem] font-mono tracking-widest text-brand-primary/60 uppercase">
            {sublabel}
          </span>
        ) : null}
        {children}
      </div>
    </div>
  );
}
