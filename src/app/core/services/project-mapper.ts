import {
  GitHubRepository
} from '../models/github-repository';

import {
  Project,
  Technology
} from '../models/project';

function mapTechnology(
  language: string | null
): Technology {
  switch (language) {
    case 'TypeScript':
      return 'TypeScript';

    case 'JavaScript':
      return 'JavaScript';

    case 'React':
      return 'React';

    case 'Angular':
      return 'Angular';

    default:
      return 'Other';
  }
}

export function mapGitHubRepository(
  repository: GitHubRepository
): Project {
  return {
    id: String(repository.id),
    title: repository.name,
    description:
      repository.description ??
      'No description provided.',
    technologies: [
      mapTechnology(repository.language)
    ],
    githubUrl: repository.html_url,
    stars: repository.stargazers_count,
    forks: repository.forks_count,
    updatedAt: repository.updated_at
  };
}