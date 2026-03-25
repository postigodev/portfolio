import { ArrowLeft, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
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
  const overviewSummary = normalizeText(detail.overview).split(". ")[0] + ".";
  const impactSummary = normalizeText(detail.impactDetail[0] ?? system.impact);

  return (
    <Layout>
      <article className="mx-auto max-w-6xl space-y-12">
        <div className="space-y-8 border-b border-border/80 pb-12">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-goat"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to systems
          </Link>

          <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(18rem,22rem)] lg:items-end">
            <div className="space-y-6">
              <div className="space-y-3">
                <p className="section-label">System dossier</p>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.07em] text-foreground sm:text-5xl lg:text-6xl">
                  {system.title}
                </h1>
                <p className="max-w-3xl text-lg leading-8 text-foreground/88">
                  {normalizeText(system.system)}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {system.stack.map((tech) => (
                  <Badge
                    key={tech}
                    variant="secondary"
                    className="rounded-full border border-border/80 bg-card/70 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground"
                  >
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            <aside className="dossier-panel overflow-hidden">
              <div className="editorial-rule" />
              <div className="space-y-6 p-6">
                <div className="space-y-2">
                  <p className="stat-kicker">Role in portfolio</p>
                  <p className="text-sm leading-7 text-muted-foreground">
                    Technical case study focused on problem framing, system boundaries, and
                    operational tradeoffs.
                  </p>
                </div>

                {system.repoUrl && (
                  <a
                    href={system.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground transition-colors hover:text-goat"
                  >
                    <Github className="h-3.5 w-3.5" />
                    View source
                  </a>
                )}
              </div>
            </aside>
          </div>
        </div>

        <section className="grid gap-4 lg:grid-cols-3">
          <article className="dossier-panel p-6">
            <p className="stat-kicker">Problem</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              {normalizeText(system.problem)}
            </p>
          </article>
          <article className="dossier-panel p-6">
            <p className="stat-kicker">Architecture</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{overviewSummary}</p>
          </article>
          <article className="dossier-panel p-6">
            <p className="stat-kicker">Impact</p>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">{impactSummary}</p>
          </article>
        </section>

        <section className="grid gap-12 lg:grid-cols-[minmax(0,1.15fr)_20rem]">
          <div className="space-y-12">
            <section className="space-y-4">
              <p className="section-label">Overview</p>
              <p className="max-w-3xl text-base leading-8 text-muted-foreground">
                {normalizeText(detail.overview)}
              </p>
            </section>

            <section className="space-y-4">
              <p className="section-label">Problem</p>
              <div className="space-y-4">
                {detail.problemDetail.split("\n\n").map((paragraph, i) => (
                  <p key={i} className="max-w-3xl text-base leading-8 text-muted-foreground">
                    {normalizeText(paragraph)}
                  </p>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <p className="section-label">System design</p>
              <div className="dossier-panel p-6">
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
                      <p key={i} className="text-sm leading-7 text-muted-foreground">
                        {block}
                      </p>
                    );
                  })}
                </div>

                {detail.architectureDiagram && (
                  <pre className="mt-6 overflow-x-auto rounded-xl border border-border/80 bg-background/70 p-5 font-mono text-xs leading-6 text-muted-foreground">
                    {normalizeText(detail.architectureDiagram)}
                  </pre>
                )}
              </div>
            </section>

            <section className="space-y-4">
              <p className="section-label">Key decisions</p>
              <div className="grid gap-4 md:grid-cols-2">
                {detail.keyDecisions.map((decision) => (
                  <article key={decision.decision} className="dossier-panel p-6">
                    <h2 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                      {normalizeText(decision.decision)}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {normalizeText(decision.reasoning)}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <p className="section-label">Tradeoffs</p>
              <div className="grid gap-4 md:grid-cols-2">
                {detail.tradeoffs.map((tradeoff) => (
                  <article key={tradeoff.tradeoff} className="dossier-panel p-6">
                    <h2 className="text-xl font-semibold tracking-[-0.04em] text-foreground">
                      {normalizeText(tradeoff.tradeoff)}
                    </h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">
                      {normalizeText(tradeoff.reasoning)}
                    </p>
                  </article>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start">
            {detail.constraints && detail.constraints.length > 0 && (
              <section className="dossier-panel p-6">
                <p className="section-label">Constraints</p>
                <ul className="mt-5 space-y-3">
                  {detail.constraints.map((constraint, i) => (
                    <li key={i} className="text-sm leading-7 text-muted-foreground">
                      - {normalizeText(constraint)}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            <section className="dossier-panel p-6">
              <p className="section-label">Impact</p>
              <ul className="mt-5 space-y-4">
                {detail.impactDetail.map((item, i) => (
                  <li key={i} className="border-l border-goat/50 pl-4 text-sm leading-7 text-foreground">
                    {normalizeText(item)}
                  </li>
                ))}
              </ul>
            </section>

            {detail.futureWork && detail.futureWork.length > 0 && (
              <section className="dossier-panel p-6">
                <p className="section-label">Future work</p>
                <ul className="mt-5 space-y-3">
                  {detail.futureWork.map((item, i) => (
                    <li key={i} className="text-sm leading-7 text-muted-foreground">
                      - {normalizeText(item)}
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </aside>
        </section>
      </article>
    </Layout>
  );
};

export default SystemDetail;
