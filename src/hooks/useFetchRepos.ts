import { useState, useEffect } from "react";
import axios from "axios";
import { Repo } from "../types/Repo";

// Custom hook to fetch list of repositories
export const useFetchRepos = () => {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const response = await axios.get<Repo[]>(`${process.env.REACT_APP_REPO_BASE_URL}/repos`);
        setRepos(response.data);
      } catch (err) {
        setError("Failed to load repositories. Please try again later.");
        console.error("Error fetching repositories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return { repos, error, loading };
};
