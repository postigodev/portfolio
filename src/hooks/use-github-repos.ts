import { useQuery } from "@tanstack/react-query";
import { fallbackRepos } from "@/content/open-source";

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  topics: string[];
  fork: boolean;

  // Presentation-layer overrides
  displayDescription?: string;
  displayTopics?: string[];
  displayOrder?: number;
  hidden?: boolean;
}

type RepoOverride = {
  displayDescription?: string;
  displayTopics?: string[];
  displayOrder?: number;
  hidden?: boolean;
};

const repoOverrides: Record<string, RepoOverride> = {
  deskremote: {
    displayDescription:
      "desktop control system coordinating Spotify playback and Fire TV devices through a unified local interface.",
    displayTopics: ["tauri", "typescript", "adb", "spotify"],
    displayOrder: 1,
  },
  "cart-generator": {
    displayDescription:
      "stateful planning system that transforms saved recipes into structured, retailer-aware shopping carts.",
    displayTopics: [
      "nestjs",
      "postgresql",
      "planning",
      "systems",
    ],
    displayOrder: 2,
  }
};

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const res = await fetch(
    "https://api.github.com/users/postigodev/repos?sort=updated&per_page=30",
    { headers: { Accept: "application/vnd.github.mercy-preview+json" } },
  );

  if (!res.ok) throw new Error("Failed to fetch GitHub repos");

  const repos: GitHubRepo[] = await res.json();

  return repos
    .filter((repo) => !repo.fork && repo.name !== "postigodev")
    .map((repo) => {
      const override = repoOverrides[repo.name];

      return {
        ...repo,
        displayDescription: override?.displayDescription ?? repo.description,
        displayTopics: override?.displayTopics ?? repo.topics,
        displayOrder: override?.displayOrder ?? Number.MAX_SAFE_INTEGER,
        hidden: override?.hidden ?? false,
      };
    })
    .filter((repo) => !repo.hidden)
    .sort((a, b) => {
      const orderDiff =
        (a.displayOrder ?? Number.MAX_SAFE_INTEGER) -
        (b.displayOrder ?? Number.MAX_SAFE_INTEGER);
      if (orderDiff !== 0) return orderDiff;

      return b.stargazers_count - a.stargazers_count;
    });
};

export const useGitHubRepos = () =>
  useQuery({
    queryKey: ["github-repos"],
    queryFn: async () => {
      try {
        return await fetchGitHubRepos();
      } catch {
        return fallbackRepos;
      }
    },
    staleTime: 1000 * 60 * 10,
  });
