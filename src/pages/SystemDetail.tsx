import { ArrowLeft, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
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
  const architectureBlocks = detail.architecture.split("\n\n").map((block) => normalizeText(block));

  return (
    <Layout>
      <article className="mx-auto max-w-4xl space-y-10 pb-8">
        <header className="space-y-5">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-muted-foreground transition-colors hover:text-goat"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to systems
          </Link>

          <div className="space-y-3">
            <p className="section-label">System dossier</p>
            <h1 className="text-4xl font-semibold tracking-[-0.07em] text-foreground sm:text-5xl lg:text-6xl">
              {system.title}
            </h1>
            <p className="max-w-3xl text-lg leading-8 text-foreground/88">
              {normalizeText(system.system)}
            </p>
          </div>

          <div className="flex items-start justify-between gap-6 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
            <span className="flex-1">{system.stack.join(" | ")}</span>
            {system.repoUrl && (
              <a
                href={system.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        </header>

        <section className="grid gap-5 border-t border-border/70 pt-6 md:grid-cols-3">
          <div>
            <p className="stat-kicker">Problem</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {normalizeText(system.problem)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">System</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {normalizeText(detail.overview)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">Impact</p>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              {normalizeText(detail.impactDetail[0] ?? system.impact)}
            </p>
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">Problem</p>
          <div className="space-y-4">
            {detail.problemDetail.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-muted-foreground">
                {normalizeText(paragraph)}
              </p>
            ))}
          </div>
        </section>

        {detail.constraints && detail.constraints.length > 0 && (
          <section className="space-y-4 border-t border-border/70 pt-6">
            <p className="section-label">Constraints</p>
            <ul className="space-y-2">
              {detail.constraints.map((constraint, i) => (
                <li key={i} className="text-sm leading-7 text-muted-foreground">
                  - {normalizeText(constraint)}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">System design</p>
          <div className="space-y-4">
            {architectureBlocks.map((block, i) => {
              const isList = block.startsWith("- ");

              if (isList) {
                return (
                  <ul key={i} className="space-y-2">
                    {block.split("\n").map((line, j) => (
                      <li key={j} className="text-sm leading-7 text-muted-foreground">
                        {line}
                      </li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={i} className="text-base leading-8 text-muted-foreground">
                  {block}
                </p>
              );
            })}
          </div>

          {detail.architectureDiagram && (
            <pre className="overflow-x-auto border border-border/60 p-4 font-mono text-xs leading-6 text-muted-foreground">
              {normalizeText(detail.architectureDiagram)}
            </pre>
          )}
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">Key decisions</p>
          <div>
            {detail.keyDecisions.map((decision) => (
              <div key={decision.decision} className="border-t border-border/70 py-4 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                  {normalizeText(decision.decision)}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {normalizeText(decision.reasoning)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">Tradeoffs</p>
          <div>
            {detail.tradeoffs.map((tradeoff) => (
              <div key={tradeoff.tradeoff} className="border-t border-border/70 py-4 first:border-t-0 first:pt-0">
                <h2 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                  {normalizeText(tradeoff.tradeoff)}
                </h2>
                <p className="mt-2 text-sm leading-7 text-muted-foreground">
                  {normalizeText(tradeoff.reasoning)}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">Impact</p>
          <ul className="space-y-3">
            {detail.impactDetail.map((item, i) => (
              <li key={i} className="text-sm leading-7 text-foreground">
                {normalizeText(item)}
              </li>
            ))}
          </ul>
        </section>

        {detail.futureWork && detail.futureWork.length > 0 && (
          <section className="space-y-4 border-t border-border/70 pt-6">
            <p className="section-label">Future work</p>
            <ul className="space-y-2">
              {detail.futureWork.map((item, i) => (
                <li key={i} className="text-sm leading-7 text-muted-foreground">
                  - {normalizeText(item)}
                </li>
              ))}
            </ul>
          </section>
        )}
      </article>
    </Layout>
  );
};

export default SystemDetail;
