import { render, screen, fireEvent } from "@testing-library/react";
import RepoTable from "../components/RepoTable"; // Adjust path if necessary
import { Repo } from "../types/Repo";

const mockRepos: Repo[] = [
  {
    id: 1,
    name: "repo-one",
    description: "Description for repo one",
    language: "JavaScript",
    forks: 5,
    open_issues: 2,
    watchers: 3,
    html_url: "https://github.com/repo-one",
  },
  {
    id: 2,
    name: "repo-two",
    description: "Description for repo two",
    language: "Python",
    forks: 10,
    open_issues: 5,
    watchers: 8,
    html_url: "https://github.com/repo-two",
  },
];

describe("RepoTable Component", () => {
  const handleDescriptionClick = jest.fn();
  const handleNameClick = jest.fn();

  it("renders repo list correctly", () => {
    render(
      <RepoTable
        repos={mockRepos}
        searchTerm=""
        currentPage={1}
        reposPerPage={2}
        handleDescriptionClick={handleDescriptionClick}
        handleNameClick={handleNameClick}
      />
    );

    // Check if repo names are displayed
    expect(screen.getByText("repo-one")).toBeInTheDocument();
    expect(screen.getByText("repo-two")).toBeInTheDocument();

    // Check if descriptions are displayed
    expect(screen.getByText("Description for repo one")).toBeInTheDocument();
    expect(screen.getByText("Description for repo two")).toBeInTheDocument();

    // Check if "GitHub Link" is present
    expect(screen.getAllByText("GitHub Link")[0]).toHaveAttribute(
      "href",
      "https://github.com/repo-one"
    );
    expect(screen.getAllByText("GitHub Link")[1]).toHaveAttribute(
      "href",
      "https://github.com/repo-two"
    );
  });

  it("filters repos based on search term", () => {
    render(
      <RepoTable
        repos={mockRepos}
        searchTerm="repo-two"
        currentPage={1}
        reposPerPage={2}
        handleDescriptionClick={handleDescriptionClick}
        handleNameClick={handleNameClick}
      />
    );

    // Ensure only "repo-two" is displayed after search
    expect(screen.getByText("repo-two")).toBeInTheDocument();
    expect(screen.queryByText("repo-one")).toBeNull();
  });

  it("handles no repositories case", () => {
    render(
      <RepoTable
        repos={[]}
        searchTerm=""
        currentPage={1}
        reposPerPage={2}
        handleDescriptionClick={handleDescriptionClick}
        handleNameClick={handleNameClick}
      />
    );

    // Check if "No repositories found" message is displayed
    expect(screen.getByText("No repositories found")).toBeInTheDocument();
  });

  it("handles description click", () => {
    render(
      <RepoTable
        repos={mockRepos}
        searchTerm=""
        currentPage={1}
        reposPerPage={2}
        handleDescriptionClick={handleDescriptionClick}
        handleNameClick={handleNameClick}
      />
    );

    // Simulate clicking on the description button for "repo-one"
    const descriptionButton = screen.getAllByText("more")[0];
    fireEvent.click(descriptionButton);

    // Verify that the handler was called with the correct description
    expect(handleDescriptionClick).toHaveBeenCalledWith("Description for repo one");
  });

  it("handles name click", () => {
    render(
      <RepoTable
        repos={mockRepos}
        searchTerm=""
        currentPage={1}
        reposPerPage={2}
        handleDescriptionClick={handleDescriptionClick}
        handleNameClick={handleNameClick}
      />
    );

    // Simulate clicking on the name for "repo-two"
    const repoName = screen.getByText("repo-two");
    fireEvent.click(repoName);

    // Verify that the handler was called with the correct name
    expect(handleNameClick).toHaveBeenCalledWith("repo-two");
  });
});
