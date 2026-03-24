import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { projects } from "@/content/projects";
import { normalizeText } from "@/lib/utils";

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const project = projects.find((item) => item.slug === slug);

  if (!project) {
    return (
      <Layout>
        <div className="max-w-2xl">
          <p className="text-muted-foreground">Project not found.</p>
          <Link to="/projects" className="mt-4 inline-block text-sm text-foreground hover:underline">
            {"<-"} Back to projects
          </Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article className="max-w-2xl">
        <Link
          to="/projects"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back to projects
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-foreground">{project.title}</h1>
        <p className="mt-3 text-base leading-relaxed text-muted-foreground">
          {normalizeText(project.description)}
        </p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.stack.map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs font-mono font-normal">
              {tech}
            </Badge>
          ))}
        </div>

        {(project.githubUrl || project.demoUrl) && (
          <div className="mt-4 flex gap-2">
            {project.githubUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-1.5 h-4 w-4" /> Source
                </a>
              </Button>
            )}
            {project.demoUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-4 w-4" /> Demo
                </a>
              </Button>
            )}
          </div>
        )}

        {project.detail && (
          <>
            <Separator className="my-8" />

            <section className="space-y-8">
              <div>
                <h2 className="text-base font-semibold text-foreground">Problem</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {normalizeText(project.detail.problem)}
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground">System Design</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {normalizeText(project.detail.systemDesign)}
                </p>
              </div>

              <div>
                <h2 className="text-base font-semibold text-foreground">Key Decisions</h2>
                <ul className="mt-2 space-y-1.5">
                  {project.detail.keyDecisions.map((decision, i) => (
                    <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                      - {normalizeText(decision)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </>
        )}
      </article>
    </Layout>
  );
};

export default ProjectDetail;
