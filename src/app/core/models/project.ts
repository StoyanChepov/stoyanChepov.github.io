export interface Project {
  id: string;
  title: string;
  description: string;
  primaryLanguage: string | null;
  languages: Record<string, number>;

  githubUrl: string;

  stars: number;
  forks: number;

  updatedAt: string;
}