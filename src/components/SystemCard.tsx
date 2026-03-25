import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import type { System } from "@/content/systems";
import { Badge } from "@/components/ui/badge";
import { normalizeText } from "@/lib/utils";

const SystemCard = ({ system }: { system: System }) => {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-border/80 bg-card/70 p-6 transition-all hover:-translate-y-0.5 hover:border-goat/40 hover:bg-card">
      <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-goat/80 to-transparent opacity-70" />

      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-goat/80">
            System dossier
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-foreground">
            {system.title}
          </h3>
        </div>
        <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-colors group-hover:text-goat" />
      </div>

      <Link to={`/systems/${system.slug}`} className="mt-6 block">
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <div className="space-y-2">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
              Problem
            </p>
            <p className="text-sm leading-7 text-muted-foreground">
              {normalizeText(system.problem)}
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                System
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground">
                {normalizeText(system.system)}
              </p>
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
                Impact
              </p>
              <p className="mt-2 text-sm font-medium leading-7 text-foreground">
                {normalizeText(system.impact)}
              </p>
            </div>
          </div>
        </div>
      </Link>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-border/80 pt-5">
        {system.stack.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="rounded-full border border-border/70 bg-background/60 px-2.5 py-1 font-mono text-[11px] font-normal uppercase tracking-[0.18em] text-muted-foreground"
          >
            {tech}
          </Badge>
        ))}
        {system.repoUrl && (
          <a
            href={system.repoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-auto inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-goat"
            onClick={(e) => e.stopPropagation()}
          >
            <Github className="h-3.5 w-3.5" />
            Source
          </a>
        )}
      </div>
    </article>
  );
};

export default SystemCard;
