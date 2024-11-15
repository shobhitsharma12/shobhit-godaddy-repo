# GitHub Repo Viewer

## Objective

The goal of this project is to build a React-based application that fetches data from the GitHub API for the organization `godaddy` and displays a list of repositories. The user can click on any repository to view detailed information such as the title, description, language, forks, open issues, watchers, and a direct link to the GitHub repository page. 

The application also includes features such as search functionality, pagination, and a responsive UI with appropriate styling, ensuring a smooth user experience.

## How to Install or Start the Project

To get started with this project, follow the instructions below.

### Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (version 14.x or above)  
  Download and install Node.js from [here](https://nodejs.org/).
  
- **npm** (Node Package Manager)  
  npm comes bundled with Node.js, so installing Node.js will also install npm.

### Installation

1. **Clone the repository**

   First, clone this repository to your local machine:
   git clone https://github.com/shobhitsharma12/shobhit-godaddy-repos
   cd github-repo-viewer

2. **Install dependencies**
    After cloning the project, install the necessary dependencies by running:
    npm install
    
3. Create a .env file in the root of the project with the following environment variables:
    VITE_REPO_BASE_URL=https://api.github.com/orgs/godaddy/repos
    VITE_REPO_DETAIL_URL=https://api.github.com/repos/godaddy

    This ensures the application knows the GitHub API endpoints to fetch data from.

**Run the development server**

    To start the application in development mode, use the following command:

    npm start
    This will run the application on http://localhost:3000. 
    Open this URL in your browser to start interacting with the application.

**Building for Production**
    If you want to build the project for production, you can run:

    npm run build
    This will generate a dist folder containing the production-ready version of your app.

**Code Structure/Design**
    The application is structured to be modular and maintainable. Here’s a breakdown of the project’s key components:

    public/ Contains static files like the index.html and favicon.
    src/ This is where most of the code lives. It contains several subfolders:
    assets/: Static assets like images and JSON data.
    components/: React components, including RepoList, RepoDetail, and other reusable UI elements.
    hooks/: Custom React hooks to fetch and manage data.
    pages/: Each page, such as Home.tsx and RepoDetailPage.tsx, corresponds to a route in the app.
    styles/: SCSS files for styling the app with Tailwind CSS integrated for utility-first design.
    types/: TypeScript type definitions for better type safety.
    constants/: Stores constants like API endpoints and query parameters.
    public/index.html The HTML file which loads the React application into the DOM.
    package.json Contains all dependencies, scripts, and configuration for the project.

**Code Design**
    The application follows a component-based architecture, which is a fundamental design principle in React. Each component is responsible for rendering a specific part of the UI and is reusable across the application.

    RepoList: Displays a paginated table of repositories.
    RepoDetail: Shows detailed information for a selected repository.
    Search functionality: Provides a way to filter the repositories by name.
    Pagination: Limits the number of repositories displayed per page and allows navigation between pages.
    Performance Considerations
    Performance is an essential aspect of web applications, and here are a few key points considered for this project:

    Efficient Data Fetching:
    The application fetches only the necessary data from the API, reducing the size of the response payload. It also implements pagination to load a subset of repositories at a time, reducing the initial load time and improving performance.

    Lazy Loading for Repo Details:
    The detailed information for a specific repository is only fetched when a user clicks on it. This avoids unnecessary requests for repository details, ensuring faster initial page loads.

    Search Filtering on the Frontend:
    Instead of making multiple requests to the server for search results, the search functionality filters the repositories on the client side, which reduces load on the API server and provides instant results.

    SCSS and Tailwind CSS for Styling:
    SCSS is used for custom styles, while Tailwind CSS is employed for utility-first design. Tailwind’s class-based styling is highly optimized for performance, as it generates a minimal CSS file, resulting in a faster load time.

    Memoization with React.memo and useMemo:
    Wherever applicable, React.memo and useMemo hooks are used to prevent unnecessary re-renders and recalculations of expensive functions.

**Test Cases**
    The project includes unit and integration tests that ensure the application functions as expected. Below are the test cases covered in the project:

**RepoList Component Tests:**

    Rendering: Ensures that the repository list is rendered correctly.
    Search Filtering: Verifies that the search functionality correctly filters repositories.
    Pagination: Checks that the pagination controls allow for correct navigation between pages.
    RepoDetail Component Tests: Rendering: Verifies that the repository details page displays the correct information (e.g., title, description, forks, watchers).
    Back Button: Ensures that the back button redirects users to the previous page.
    Link to GitHub: Tests that the GitHub link works and navigates to the correct repository.

**Edge Cases:**

    Verifies handling of missing or undefined data (e.g., missing descriptions).
    Checks for proper error handling when fetching data from the GitHub API.