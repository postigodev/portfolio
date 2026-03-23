import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { System } from "@/content/systems";

const SystemCard = ({ system }: { system: System }) => (
  <Link
    to={`/systems/${system.slug}`}
    className="block rounded-lg border border-border p-5 space-y-2.5 hover:border-foreground/20 transition-colors"
  >
    <h3 className="text-base font-semibold text-foreground">{system.title}</h3>
    <div className="space-y-1 text-sm leading-relaxed">
      <p className="text-muted-foreground">{system.problem}</p>
      <p className="text-foreground">{system.system}</p>
      <p className="text-foreground font-medium">{system.impact}</p>
    </div>
    <div className="flex flex-wrap gap-1.5 pt-1">
      {system.stack.map((tech) => (
        <Badge key={tech} variant="secondary" className="text-xs font-mono font-normal">
          {tech}
        </Badge>
      ))}
    </div>
  </Link>
);

export default SystemCard;
