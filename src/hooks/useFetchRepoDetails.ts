import { useState, useEffect } from "react";

interface RepoDetail {
  name: string;
  description: string;
  html_url: string;
  language: string;
  forks: number;
  open_issues: number;
  watchers: number;
}

export const useFetchRepoDetails = (repoName: string) => {
  const [repo, setRepo] = useState<RepoDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await fetch(`https://api.github.com/repos/godaddy/${repoName}`);
        if (!response.ok) {
          throw new Error("Repo not found");
        }
        const data = await response.json();
        setRepo(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    if (repoName) {
      fetchRepoDetails();
    }
  }, [repoName]);

  return { repo, loading, error };
};
