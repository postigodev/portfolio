import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/content/projects";
import { ArrowRight } from "lucide-react";

const ProjectCard = ({ project }: { project: Project }) => (
  <Link
    to={`/projects/${project.slug}`}
    className="group block rounded-lg border border-border p-5 transition-colors hover:bg-card"
  >
    <h3 className="text-base font-semibold text-foreground group-hover:underline">
      {project.title}
    </h3>
    <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
      {project.description}
    </p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {project.stack.map((tech) => (
        <Badge key={tech} variant="secondary" className="text-xs font-mono font-normal">
          {tech}
        </Badge>
      ))}
    </div>
    <div className="mt-3 flex items-center gap-1 text-xs text-muted-foreground group-hover:text-foreground transition-colors">
      Read more <ArrowRight className="h-3 w-3" />
    </div>
  </Link>
);

export default ProjectCard;
