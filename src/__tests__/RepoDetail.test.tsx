// __tests__/RepoDetail.test.tsx
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import RepoDetail from '../components/RepoDetail'; // Adjust path if necessary
import { Repo } from '../types/Repo';

// Mocking data to pass as props
const mockRepoData: Repo = {
  id: 1,
  name: 'test-repo',
  description: 'This is a test repository.',
  language: 'JavaScript',
  forks: 10,
  open_issues: 2,
  watchers: 5,
  html_url: 'https://github.com/test-repo',
};

describe('RepoDetail Component', () => {
  it('renders repo details correctly', async () => {
    // Passing mock data as props
    render(
      <MemoryRouter initialEntries={['/repos/test-repo']}>
        <RepoDetail repo={mockRepoData} />
      </MemoryRouter>
    );

    // Check if the repo name is displayed
    expect(screen.getByText(mockRepoData.name)).toBeInTheDocument();
    
    // Check if the description is displayed
    expect(screen.getByText(mockRepoData?.description || "")).toBeInTheDocument();
    
    // Check if the language is displayed
    expect(screen.getByText(mockRepoData?.language || "")).toBeInTheDocument();
    
    // Check if the fork count is displayed
    expect(screen.getByText(mockRepoData.forks.toString())).toBeInTheDocument();
    
    // Check if the open issues count is displayed
    expect(screen.getByText(mockRepoData.open_issues.toString())).toBeInTheDocument();
    
    // Check if the watchers count is displayed
    expect(screen.getByText(mockRepoData.watchers.toString())).toBeInTheDocument();
    
    // Check if the GitHub link is working
    const linkElement = screen.getByText('GitHub Link');
    expect(linkElement).toHaveAttribute('href', mockRepoData.html_url);
  });
});
