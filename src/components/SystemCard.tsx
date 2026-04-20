import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { System } from "@/content/systems";
import { normalizeText } from "@/lib/utils";

const SystemCard = ({ system }: { system: System }) => {
  const visibleStack = system.displayStack ?? system.stack.slice(0, 6);

  return (
    <article className="group relative border-t border-border/70 py-7 transition-colors hover:border-foreground/24 md:py-8">
      <Link
        aria-label={`Open ${system.title}`}
        to={`/systems/${system.slug}`}
        className="relative z-10 block rounded-sm px-3 py-3 transition-colors group-hover:bg-card/20 md:px-4 md:py-4"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="min-w-0 space-y-3">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground transition-colors group-hover:text-goat">
                {system.title}
              </h3>
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-goat/80">
                {system.category}
              </span>
            </div>
            <p className="max-w-3xl text-[15px] leading-7 text-foreground/88">
              {normalizeText(system.hook)}
            </p>
          </div>
          <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </div>

        <div className="mt-5 grid gap-5 md:grid-cols-[0.82fr_1.12fr_1.18fr]">
          <div className="text-muted-foreground/78">
            <p className="stat-kicker">Problem</p>
            <p className="mt-2 text-xs leading-6 transition-colors group-hover:text-foreground/72">
              {normalizeText(system.problem)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">System</p>
            <p className="mt-2 text-sm leading-7 text-foreground/86">
              {normalizeText(system.system)}
            </p>
          </div>
          <div className="border-l border-goat/30 pl-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-goat/85">
              Impact
            </p>
            <p className="mt-2 text-sm font-medium leading-7 text-foreground">
              {normalizeText(system.impact)}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {visibleStack.map((tech) => (
            <span
              key={tech}
              className="border border-border/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/82 transition-colors group-hover:border-goat/35 group-hover:text-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default SystemCard;