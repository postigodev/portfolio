import type { Experience } from "@/content/experience";
import { normalizeText } from "@/lib/utils";

const renderBullet = (text: string) => {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i} className="text-foreground font-medium">
        {part.slice(2, -2)}
      </strong>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
};

const ExperienceCard = ({ exp }: { exp: Experience }) => (
  <div className="border-l-2 border-border py-1 pl-5">
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
      <div>
        <h3 className="text-base font-semibold text-foreground">{exp.role}</h3>
        <p className="text-sm text-muted-foreground">{exp.company}</p>
      </div>
      <span className="shrink-0 text-xs font-mono text-muted-foreground">
        {normalizeText(exp.period)}
      </span>
    </div>
    <ul className="mt-3 space-y-1.5">
      {exp.bullets.map((bullet, i) => (
        <li key={i} className="text-sm leading-relaxed text-muted-foreground">
          - {renderBullet(normalizeText(bullet))}
        </li>
      ))}
    </ul>
  </div>
);

export default ExperienceCard;
