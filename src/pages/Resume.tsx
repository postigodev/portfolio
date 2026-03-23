import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Layout from "@/components/Layout";
import ExperienceCard from "@/components/ExperienceCard";
import { profile } from "@/content/profile";
import { experience } from "@/content/experience";

const skillSections = [
  { label: "Languages", items: profile.skills.languages },
  { label: "Backend", items: profile.skills.backend },
  { label: "Data & Storage", items: profile.skills.data },
  { label: "Infrastructure", items: profile.skills.infrastructure },
  { label: "APIs & Systems", items: profile.skills.apis },
  { label: "Frontend", items: profile.skills.frontend },
  { label: "Tools", items: profile.skills.tools },
];

const Resume = () => (
  <Layout>
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Resume</h1>
        <Button variant="outline" size="sm" asChild>
          <a href={profile.resumeUrl} download>
            <Download className="mr-1.5 h-4 w-4" /> Download PDF
          </a>
        </Button>
      </div>

      {/* Header */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-foreground">{profile.name}</h2>
        <p className="mt-1 font-mono text-sm text-muted-foreground">{profile.title}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          {profile.location} · {profile.email}
        </p>
      </div>

      <Separator className="my-8" />

      {/* Experience */}
      <section>
        <h2 className="text-base font-semibold text-foreground uppercase tracking-wide">
          Experience
        </h2>
        <div className="mt-6 space-y-8">
          {experience.map((exp) => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>
      </section>

      <Separator className="my-8" />

      {/* Education */}
      <section>
        <h2 className="text-base font-semibold text-foreground uppercase tracking-wide">
          Education
        </h2>
        <div className="mt-4">
          <h3 className="text-base font-semibold text-foreground">
            {profile.education.school}
          </h3>
          <p className="text-sm text-muted-foreground">
            {profile.education.degree} | {profile.education.graduation}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Coursework: {profile.education.coursework.join(", ")}
          </p>
        </div>
      </section>

      <Separator className="my-8" />

      {/* Skills */}
      <section>
        <h2 className="text-base font-semibold text-foreground uppercase tracking-wide">
          Skills
        </h2>
        <div className="mt-4 space-y-4">
          {skillSections.map((section) => (
            <div key={section.label}>
              <h3 className="text-sm font-medium text-foreground">{section.label}</h3>
              <div className="mt-1.5 flex flex-wrap gap-1.5">
                {section.items.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs font-mono font-normal">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  </Layout>
);

export default Resume;
