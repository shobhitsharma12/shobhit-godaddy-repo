import React, { useState, useEffect } from 'react'; // Ensure React is imported
import { useFetchRepos } from '../hooks/useFetchRepos'; // Use single quotes
import RepoTable from '../components/RepoTable'; // Use single quotes

const Home: React.FC = () => {
  const { repos, error, loading } = useFetchRepos();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');
  const [reposPerPage, setReposPerPage] = useState(10);

  useEffect(() => {
    const calculateDefaultPageSize = () => {
      const viewportHeight = window.innerHeight;
      const itemHeight = 60;
      const paginationControlHeight = 80;
      const defaultSize = Math.floor(
        (viewportHeight - paginationControlHeight - 200) / itemHeight
      );
      setReposPerPage(Math.max(defaultSize, 5));
    };

    calculateDefaultPageSize();
    window.addEventListener('resize', calculateDefaultPageSize);

    return () => window.removeEventListener('resize', calculateDefaultPageSize);
  }, []);

  const filteredRepos = repos.filter((repo) =>
    repo.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const totalPages = Math.ceil(filteredRepos.length / reposPerPage);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  const handleReposPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setReposPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleDescriptionClick = (description: string) => {
    alert(`Description: ${description}`);
  };

  const handleNameClick = (name: string) => {
    alert(`Repo Name: ${name}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-semibold mb-4">Repositories</h2>
      <input
        type="text"
        placeholder="Search repositories..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 rounded"
      />
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-700">
          Showing {Math.min(reposPerPage, filteredRepos.length)} of{' '}
          {filteredRepos.length} repositories
        </p>
        <select
          value={reposPerPage}
          onChange={handleReposPerPageChange}
          className="p-2 border border-gray-300 rounded"
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
      {loading ? (
        <p className="text-center">Loading repositories...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <RepoTable
          repos={filteredRepos}
          searchTerm={searchTerm}
          currentPage={currentPage}
          reposPerPage={reposPerPage}
          handleDescriptionClick={handleDescriptionClick}
          handleNameClick={handleNameClick}
        />
      )}
      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => paginate(i + 1)}
            className={`px-3 py-1 rounded ${
              currentPage === i + 1 ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
