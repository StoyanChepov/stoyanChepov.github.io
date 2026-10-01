export type Technology =
  | 'Angular'
  | 'React'
  | 'Node.js'
  | 'JavaScript'
  | 'TypeScript'
  | 'Other';

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: Technology[];
  githubUrl: string;
  stars: number;
  forks: number;
  updatedAt: string;
}