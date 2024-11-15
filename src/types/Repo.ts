// Types definition for a GitHub repository
export interface Repo {
    id: number;
    name: string;
    description: string | null;
    html_url: string;
    language: string | null;
    forks: number;
    open_issues: number;
    watchers: number;
  }
  