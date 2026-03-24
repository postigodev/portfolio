import { ArrowLeft, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { systems } from "@/content/systems";
import { normalizeText } from "@/lib/utils";

const SystemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const system = systems.find((item) => item.slug === slug);

  if (!system || !system.detail) {
    return (
      <Layout>
        <div className="max-w-2xl">
          <p className="text-muted-foreground">System not found.</p>
          <Link to="/" className="mt-4 inline-block text-sm text-foreground hover:underline">
            {"<-"} Back to home
          </Link>
        </div>
      </Layout>
    );
  }

  const { detail } = system;

  return (
    <Layout>
      <article className="max-w-2xl">
        <Link
          to="/"
          className="mb-8 inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>

        <h1 className="text-2xl font-bold tracking-tight text-foreground">{system.title}</h1>
        <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
          {normalizeText(system.system)}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
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
              >
                <Github className="h-4 w-4 transition-transform group-hover:scale-110" />
                Source
              </a>
            </Badge>
          )}
        </div>

        <Separator className="my-8" />

        <section className="space-y-8">
          <div>
            <h2 className="text-base font-semibold text-foreground">Overview</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
              {normalizeText(detail.overview)}
            </p>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">Problem</h2>
            <div className="mt-2 space-y-2">
              {detail.problemDetail.split("\n\n").map((paragraph, i) => (
                <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                  {normalizeText(paragraph)}
                </p>
              ))}
            </div>
          </div>

          {detail.constraints && detail.constraints.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-foreground">Constraints</h2>
              <ul className="mt-2 space-y-1">
                {detail.constraints.map((constraint, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                    - {normalizeText(constraint)}
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div>
            <h2 className="text-base font-semibold text-foreground">System Design</h2>
            <div className="mt-2 space-y-2">
              {detail.architecture.split("\n\n").map((block, i) => {
                const normalizedBlock = normalizeText(block);

                if (normalizedBlock.startsWith("- ") || normalizedBlock.startsWith("• ")) {
                  return (
                    <ul key={i} className="space-y-1">
                      {normalizedBlock.split("\n").map((line, j) => (
                        <li key={j} className="text-sm leading-relaxed text-muted-foreground">
                          {line.replace(/^•\s?/, "- ")}
                        </li>
                      ))}
                    </ul>
                  );
                }

                return (
                  <p key={i} className="text-sm leading-relaxed text-muted-foreground">
                    {normalizedBlock}
                  </p>
                );
              })}
            </div>

            {detail.architectureDiagram && (
              <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-muted/50 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                {normalizeText(detail.architectureDiagram)}
              </pre>
            )}
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">Key Decisions</h2>
            <ul className="mt-3 space-y-3">
              {detail.keyDecisions.map((decision, i) => (
                <li key={i}>
                  <p className="text-sm font-medium text-foreground">
                    {normalizeText(decision.decision)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    -&gt; {normalizeText(decision.reasoning)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">Tradeoffs</h2>
            <ul className="mt-3 space-y-3">
              {detail.tradeoffs.map((tradeoff, i) => (
                <li key={i}>
                  <p className="text-sm font-medium text-foreground">
                    {normalizeText(tradeoff.tradeoff)}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    -&gt; {normalizeText(tradeoff.reasoning)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="text-base font-semibold text-foreground">Impact</h2>
            <ul className="mt-2 space-y-1">
              {detail.impactDetail.map((item, i) => (
                <li key={i} className="text-sm font-medium leading-relaxed text-foreground">
                  {normalizeText(item)}
                </li>
              ))}
            </ul>
          </div>

          {detail.futureWork && detail.futureWork.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-foreground">Future Work</h2>
              <ul className="mt-2 space-y-1">
                {detail.futureWork.map((item, i) => (
                  <li key={i} className="text-sm leading-relaxed text-muted-foreground">
                    - {normalizeText(item)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>
      </article>
    </Layout>
  );
};

export default SystemDetail;
