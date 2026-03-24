import { ExternalLink, Github } from "lucide-react";
import { Link } from "react-router-dom";
import type { System } from "@/content/systems";
import { Badge } from "@/components/ui/badge";
import { normalizeText } from "@/lib/utils";

const SystemCard = ({ system }: { system: System }) => {
  return (
    <div className="group space-y-3 rounded-lg border border-border p-5 transition-colors hover:border-foreground/20">
      <Link to={`/systems/${system.slug}`} className="block space-y-2.5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-semibold text-foreground">{system.title}</h3>
          <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="space-y-1 text-sm leading-relaxed">
          <p className="text-muted-foreground">{normalizeText(system.problem)}</p>
          <p className="text-foreground">{normalizeText(system.system)}</p>
          <p className="font-medium text-foreground">{normalizeText(system.impact)}</p>
        </div>
      </Link>
      <div className="flex flex-wrap gap-1.5 pt-1">
        {system.stack.map((tech) => (
          <Badge key={tech} variant="secondary" className="text-xs font-mono font-normal">
            {tech}
          </Badge>
        ))}
        {system.repoUrl && (
          <Badge>
            <a
              href={system.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
              Source
            </a>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SystemCard;
