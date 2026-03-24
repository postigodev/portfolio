import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Github } from "lucide-react";
import type { System } from "@/content/systems";

const SystemCard = ({ system }: { system: System }) => {
  return (
    <div className="rounded-lg border border-border p-5 space-y-3 hover:border-foreground/20 transition-colors">
      {/* CLICKABLE MAIN AREA */}
      <Link to={`/systems/${system.slug}`} className="block space-y-2.5">
        <h3 className="text-base font-semibold text-foreground">
          {system.title}
        </h3>

        <div className="space-y-1 text-sm leading-relaxed">
          <p className="text-muted-foreground">{system.problem}</p>
          <p className="text-foreground">{system.system}</p>
          <p className="text-foreground font-medium">{system.impact}</p>
        </div>
      </Link>

      {/* STACK */}
      <div className="flex flex-wrap gap-1.5 pt-1">
        {system.stack.map((tech) => (
          <Badge
            key={tech}
            variant="secondary"
            className="text-xs font-mono font-normal"
          >
            {tech}
          </Badge>
        ))}
        {system.repoUrl && (
          <Badge>
            <a
              href={system.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors group"
              onClick={(e) => e.stopPropagation()}
            >
              <Github className="h-4 w-4 group-hover:scale-110 transition-transform" />
              Source
            </a>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default SystemCard;
