import type { Experience } from "@/content/experience";
import { normalizeText } from "@/lib/utils";

const renderBullet = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="font-medium text-foreground">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const ExperienceCard = ({ exp }: { exp: Experience }) => (
  <div className="group border-l-2 border-border py-1 pl-5 transition-colors hover:border-foreground/25">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-foreground transition-colors group-hover:text-foreground">
          {exp.role}
        </h3>
        <p className="text-sm text-muted-foreground transition-colors group-hover:text-foreground/80">
          {exp.company}
        </p>
      </div>
      <span className="shrink-0 text-xs font-mono text-muted-foreground transition-colors group-hover:text-foreground/75">
        {normalizeText(exp.period)}
      </span>
    </div>
    <ul className="mt-3 space-y-1.5">
      {exp.bullets.map((bullet, i) => (
        <li
          key={i}
          className="text-sm leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground/76"
        >
          - {renderBullet(normalizeText(bullet))}
        </li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard;
