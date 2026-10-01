export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  topics: string[];
  languages_url: string;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  pushed_at: string;
  fork: boolean;
  archived: boolean;
}