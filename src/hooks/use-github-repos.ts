import { useQuery } from "@tanstack/react-query";

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
}

const fetchGitHubRepos = async (): Promise<GitHubRepo[]> => {
  const res = await fetch(
    "https://api.github.com/users/postigodev/repos?sort=updated&per_page=30",
    { headers: { Accept: "application/vnd.github.mercy-preview+json" } }
  );
  if (!res.ok) throw new Error("Failed to fetch GitHub repos");
  const repos: GitHubRepo[] = await res.json();
  return repos
    .filter((r) => !r.fork && r.name !== "postigodev")
    .sort((a, b) => b.stargazers_count - a.stargazers_count);
};

export const useGitHubRepos = () =>
  useQuery({
    queryKey: ["github-repos"],
    queryFn: fetchGitHubRepos,
    staleTime: 1000 * 60 * 10,
  });
