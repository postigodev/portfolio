import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import { systems } from "@/content/systems";
import { Github } from "lucide-react";
const SystemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const system = systems.find((s) => s.slug === slug);

  if (!system || !system.detail) {
    return (
      <Layout>
        <div className="max-w-2xl">
          <p className="text-muted-foreground">System not found.</p>
          <Link
            to="/"
            className="text-sm text-foreground hover:underline mt-4 inline-block"
          >
            ← Back to home
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
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" /> Back
        </Link>

        {/* Header */}
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          {system.title}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
          {system.system}
        </p>
        <div className="mt-3 flex flex-wrap gap-1.5">
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

        <Separator className="my-8" />

        {/* Overview */}
        <section className="space-y-8">
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Overview
            </h2>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              {detail.overview}
            </p>
          </div>

          {/* Problem */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Problem</h2>
            <div className="mt-2 space-y-2">
              {detail.problemDetail.split("\n\n").map((p, i) => (
                <p
                  key={i}
                  className="text-sm text-muted-foreground leading-relaxed"
                >
                  {p}
                </p>
              ))}
            </div>
          </div>

          {/* Constraints */}
          {detail.constraints && detail.constraints.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Constraints
              </h2>
              <ul className="mt-2 space-y-1">
                {detail.constraints.map((c, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    – {c}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* System Design */}
          <div>
            <h2 className="text-base font-semibold text-foreground">
              System Design
            </h2>
            <div className="mt-2 space-y-2">
              {detail.architecture.split("\n\n").map((block, i) => {
                if (block.startsWith("• ")) {
                  return (
                    <ul key={i} className="space-y-1">
                      {block.split("\n").map((line, j) => (
                        <li
                          key={j}
                          className="text-sm text-muted-foreground leading-relaxed"
                        >
                          {line}
                        </li>
                      ))}
                    </ul>
                  );
                }
                return (
                  <p
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    {block}
                  </p>
                );
              })}
            </div>

            {detail.architectureDiagram && (
              <pre className="mt-4 overflow-x-auto rounded-md border border-border bg-muted/50 p-4 font-mono text-xs leading-relaxed text-muted-foreground">
                {detail.architectureDiagram}
              </pre>
            )}
          </div>

          {/* Key Decisions */}
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Key Decisions
            </h2>
            <ul className="mt-3 space-y-3">
              {detail.keyDecisions.map((d, i) => (
                <li key={i}>
                  <p className="text-sm text-foreground font-medium">
                    {d.decision}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    → {d.reasoning}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Tradeoffs */}
          <div>
            <h2 className="text-base font-semibold text-foreground">
              Tradeoffs
            </h2>
            <ul className="mt-3 space-y-3">
              {detail.tradeoffs.map((t, i) => (
                <li key={i}>
                  <p className="text-sm text-foreground font-medium">
                    {t.tradeoff}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    → {t.reasoning}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Impact */}
          <div>
            <h2 className="text-base font-semibold text-foreground">Impact</h2>
            <ul className="mt-2 space-y-1">
              {detail.impactDetail.map((item, i) => (
                <li
                  key={i}
                  className="text-sm text-foreground font-medium leading-relaxed"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Future Work */}
          {detail.futureWork && detail.futureWork.length > 0 && (
            <div>
              <h2 className="text-base font-semibold text-foreground">
                Future Work
              </h2>
              <ul className="mt-2 space-y-1">
                {detail.futureWork.map((item, i) => (
                  <li
                    key={i}
                    className="text-sm text-muted-foreground leading-relaxed"
                  >
                    – {item}
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
