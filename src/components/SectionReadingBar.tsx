import { profile } from "@/content/profile";

type SectionReadingBarProps = {
  title: string;
  visible: boolean;
};

const SectionReadingBar = ({ title, visible }: SectionReadingBarProps) => {
  return (
    <div
      data-reading-bar-root
      aria-hidden={!visible}
      className={`sticky top-0 z-20 -mt-2 border-b border-border/60 bg-background/90 transition-all duration-200 ${
        visible
          ? "pointer-events-auto translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-1 opacity-0"
      }`}
    >
      <div className="mx-auto max-w-4xl px-0 py-2">
        <div className="relative">
          <span className="absolute -left-5 top-1/2 -translate-y-1/2 text-[11px]">
            🐐
          </span>

          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            {title}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SectionReadingBar;