import { useEffect, useState } from "react";

export type ReadingSection = {
  id: string;
  title: string;
};

const FALLBACK_THRESHOLD = 20;

export function useReadingSections(sections: ReadingSection[]) {
  const [activeTitle, setActiveTitle] = useState("");
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sections.length === 0) {
      return;
    }

    const updateActiveSection = () => {
      const stickyBoundary =
        document.querySelector<HTMLElement>("[data-reading-bar-root]")?.getBoundingClientRect()
          .bottom ?? FALLBACK_THRESHOLD;
      let nextTitle = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) {
          continue;
        }

        const rect = element.getBoundingClientRect();

        if (rect.bottom <= stickyBoundary) {
          nextTitle = section.title;
        }
      }

      setActiveTitle(nextTitle);
      setIsVisible(nextTitle.length > 0);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [sections]);

  return {
    activeTitle,
    isVisible,
  };
}
