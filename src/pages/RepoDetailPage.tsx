import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useFetchRepoDetails } from '../hooks/useFetchRepoDetails'; // Adjust the import path accordingly

const RepoDetailPage: React.FC = () => {
  const { repoName } = useParams<{ repoName: string }>(); // Access repoName from the URL
  const navigate = useNavigate(); // Hook to navigate programmatically

  // Use the custom hook to fetch the repo details
  const { repo, loading, error } = useFetchRepoDetails(repoName || '');

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-red-500">
        <div>Error: {error}</div>
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
        {/* Back Button */}
        <button
          onClick={() => navigate('/')} // Redirect to the list page (adjust the path if needed)
          className="text-blue-500 underline mb-4"
        >
          Back to List
        </button>

        <h2 className="text-4xl font-semibold mb-4">{repo.name}</h2>
        <p className="text-gray-700 mb-4">
          {repo.description || 'No description available'}
        </p>
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
            <p>
              <strong>Language:</strong> {repo.language || 'N/A'}
            </p>
            <p>
              <strong>Forks:</strong> {repo.forks}
            </p>
          </div>
          <div>
            <p>
              <strong>Open Issues:</strong> {repo.open_issues}
            </p>
            <p>
              <strong>Watchers:</strong> {repo.watchers}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoDetailPage;
