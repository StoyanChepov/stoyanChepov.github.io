import { HttpTestingController } from '@angular/common/http/testing';

import { GitHubRepository } from '../core/models/github-repository';

export const REPOSITORIES_URL =
  'https://api.github.com/users/StoyanChepov/repos';

export function mockRepository(
  overrides: Partial<GitHubRepository> = {}
): GitHubRepository {
  return {
    id: 1,
    name: 'portfolio',
    full_name: 'StoyanChepov/portfolio',
    html_url: 'https://github.com/StoyanChepov/portfolio',
    homepage: null,
    has_pages: false,
    description: 'Personal portfolio built with Angular.',
    language: 'TypeScript',
    topics: [],
    languages_url: 'https://api.github.com/repos/StoyanChepov/portfolio/languages',
    stargazers_count: 0,
    forks_count: 0,
    updated_at: '2026-01-01T00:00:00Z',
    pushed_at: '2026-01-01T00:00:00Z',
    fork: false,
    archived: false,
    ...overrides
  };
}

export function flushRepositories(
  httpTesting: HttpTestingController,
  repositories: GitHubRepository[]
): void {
  httpTesting
    .expectOne(request => request.url.startsWith(REPOSITORIES_URL))
    .flush(repositories);
}
