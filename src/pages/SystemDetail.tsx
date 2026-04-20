import { ArrowLeft, Github } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import Layout from "@/components/Layout";
import SectionReadingBar from "@/components/SectionReadingBar";
import { systems } from "@/content/systems";
import { useReadingSections } from "@/hooks/use-reading-sections";
import { normalizeText } from "@/lib/utils";

const SystemDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const system = systems.find((item) => item.slug === slug);
  const sectionConfig = system?.detail
    ? [
        { id: "system-title", title: system.title },
        { id: "system-problem-title", title: "Problem" },
        { id: "system-constraints-title", title: "Constraints" },
        { id: "system-design-title", title: "System design" },
        { id: "system-decisions-title", title: "Key decisions" },
        { id: "system-tradeoffs-title", title: "Tradeoffs" },
        { id: "system-impact-title", title: "Impact" },
        { id: "system-future-work-title", title: "Future work" },
      ]
    : [];
  const { activeTitle, isVisible } = useReadingSections(sectionConfig);

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
  const visibleStack = system.displayStack ?? system.stack.slice(0, 6);

  return (
    <Layout>
      <SectionReadingBar title={activeTitle} visible={isVisible} />

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
            <h1
              id="system-title"
              className="text-4xl font-semibold tracking-[-0.07em] text-foreground sm:text-5xl lg:text-6xl"
            >
              {system.title}
            </h1>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-goat/80">
              {system.category}
            </p>
            <p className="max-w-3xl text-lg leading-8 text-foreground/88">
              {normalizeText(system.hook)}
            </p>
          </div>

          <div className="flex items-start justify-between gap-6">
            <div className="flex flex-1 flex-wrap gap-2">
              {visibleStack.map((tech) => (
                <span
                  key={tech}
                  className="border border-border/80 px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-foreground/82"
                >
                  {tech}
                </span>
              ))}
            </div>
            {system.repoUrl && (
              <a
                href={system.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <Github className="h-3.5 w-3.5" />
                Source
              </a>
            )}
          </div>
        </header>

        <section className="grid gap-5 border-t border-border/70 pt-6 md:grid-cols-[0.82fr_1.12fr_1.18fr]">
          <div className="text-muted-foreground/78">
            <p className="stat-kicker">Problem</p>
            <p className="mt-2 text-xs leading-6">
              {normalizeText(system.problem)}
            </p>
          </div>
          <div>
            <p className="stat-kicker">System</p>
            <p className="mt-2 text-sm leading-7 text-foreground/86">
              {normalizeText(system.system)}
            </p>
          </div>
          <div className="border-l border-goat/30 pl-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-goat/85">Impact</p>
            <p className="mt-2 text-sm font-medium leading-7 text-foreground">
              {normalizeText(system.impact)}
            </p>
          </div>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p className="section-label">Overview</p>
          <p className="max-w-3xl text-base leading-8 text-muted-foreground">
            {normalizeText(detail.overview)}
          </p>
        </section>

        <section className="space-y-4 border-t border-border/70 pt-6">
          <p id="system-problem-title" className="section-label">
            Problem
          </p>
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
            <p id="system-constraints-title" className="section-label">
              Constraints
            </p>
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
          <p id="system-design-title" className="section-label">
            System design
          </p>
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
          <p id="system-decisions-title" className="section-label">
            Key decisions
          </p>
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
          <p id="system-tradeoffs-title" className="section-label">
            Tradeoffs
          </p>
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
          <p id="system-impact-title" className="section-label">
            Impact
          </p>
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
            <p id="system-future-work-title" className="section-label">
              Future work
            </p>
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
