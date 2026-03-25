import { ArrowUpDown, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import type { System } from "@/content/systems";
import { normalizeText } from "@/lib/utils";

const SystemCard = ({ system }: { system: System }) => {
  const [primaryTech, ...otherTech] = system.stack;

  return (
    <article className="group relative border-t border-border/70 py-2 transition-colors hover:border-foreground/20">
      <Link
        aria-label={`Open ${system.title}`}
        to={`/systems/${system.slug}`}
        className="relative z-10 py-5 transition-colors p-2 group-hover:bg-card/20"
      >
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="text-2xl font-semibold tracking-[-0.04em] text-foreground transition-colors group-hover:text-goat">
                {system.title}
              </h3>
            </div>
          </div>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
        </div>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          <div>
            <p className="stat-kicker">Problem</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground transition-colors group-hover:text-foreground/72">
              {normalizeText(system.problem)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">System</p>
            <p className="mt-2 text-sm leading-7 text-foreground/92">
              {normalizeText(system.system)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">Impact</p>
            <p className="mt-2 text-sm leading-7 text-foreground">
              {normalizeText(system.impact)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-x-3 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
          <span className="font-semibold text-foreground">{primaryTech}</span>
          {otherTech.map((tech) => (
            <span key={tech} className="text-muted-foreground">
              {tech}
            </span>
          ))}
        </div>
      </Link>
    </article>
  );
};

export default SystemCard;
