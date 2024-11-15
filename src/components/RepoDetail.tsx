import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Repo } from "../types/Repo";

const RepoDetail: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>(); // Get repoName from the URL
  const [repo, setRepo] = useState<Repo | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://api.github.com/repos/${repoName}`);
        const data = await response.json();
        setRepo(data);
      } catch (error) {
        console.error("Error fetching repo details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (repoName) {
      fetchRepoDetails();
    }
  }, [repoName]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!repo) {
    return (
      <div className="flex justify-center items-center min-h-screen text-gray-500">
        <div>Repo not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-3xl font-semibold mb-4">{repo.name}</h2>
        <p className="text-gray-700 mb-4">{repo.description || "No description available"}</p>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 underline mb-4 block"
        >
          View on GitHub
        </a>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <p><strong>Language:</strong> {repo.language || "N/A"}</p>
            <p><strong>Forks:</strong> {repo.forks}</p>
          </div>
          <div>
            <p><strong>Open Issues:</strong> {repo.open_issues}</p>
            <p><strong>Watchers:</strong> {repo.watchers}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetail;
