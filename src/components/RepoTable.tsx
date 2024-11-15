import React from "react";
import { Repo } from "../types/Repo";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

interface RepoTableProps {
  repos: Repo[];
  searchTerm: string;
  currentPage: number;
  reposPerPage: number;
  handleDescriptionClick: (description: string) => void;
  handleNameClick: (name: string) => void;
}

const RepoTable: React.FC<RepoTableProps> = ({
  repos,
  searchTerm,
  currentPage,
  reposPerPage,
  handleDescriptionClick,
  handleNameClick,
}) => {
  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastRepo = currentPage * reposPerPage;
  const indexOfFirstRepo = indexOfLastRepo - reposPerPage;
  const currentRepos = filteredRepos.slice(indexOfFirstRepo, indexOfLastRepo);

  return (
    <table className="min-w-full bg-white border border-gray-200">
      <thead>
        <tr>
          <th className="px-4 py-2 border-b text-left">Name</th>
          <th className="px-4 py-2 border-b text-left">Description</th>
          <th className="px-4 py-2 border-b text-left">Language</th>
          <th className="px-4 py-2 border-b text-left">Forks</th>
          <th className="px-4 py-2 border-b text-left">Open Issues</th>
          <th className="px-4 py-2 border-b text-left">Watchers</th>
          <th className="px-4 py-2 border-b text-left">Link</th>
        </tr>
      </thead>
      <tbody>
        {currentRepos.length > 0 ? (
          currentRepos.map((repo) => (
            <tr key={repo.id}>
              <td className="px-4 py-2 border-b text-left">
                <Link
                  to={`/repo/${repo.name}`} // Redirect to RepoDetail page when repo name is clicked
                  className="text-blue-500 underline"
                >
                  {repo.name}
                </Link>
              </td>
              <td className="px-4 py-2 border-b text-left">
                {repo.description ? (
                  <>
                    {repo.description.slice(0, 50)}
                    {repo.description.length > 50 && (
                      <button
                        onClick={() =>
                          handleDescriptionClick(repo.description || "")
                        }
                        className="text-blue-500 underline ml-1"
                      >
                        more
                      </button>
                    )}
                  </>
                ) : (
                  "No description"
                )}
              </td>
              <td className="px-4 py-2 border-b text-left">
                {repo.language || "N/A"}
              </td>
              <td className="px-4 py-2 border-b text-left">{repo.forks}</td>
              <td className="px-4 py-2 border-b text-left">
                {repo.open_issues}
              </td>
              <td className="px-4 py-2 border-b text-left">{repo.watchers}</td>
              <td className="px-4 py-2 border-b text-left">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 underline"
                >
                  GitHub Link
                </a>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={7} className="text-center py-4">
              No repositories found
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default RepoTable;
