import {
  computed,
  inject,
  Service
} from '@angular/core';

import { GitHubService } from './github';

import {
  mapGitHubRepository
} from './project-mapper';

@Service()
export class ProjectService {
  private readonly githubService =
    inject(GitHubService);

  readonly projects = computed(() => {
    const repositories =
      this.githubService.repositories;

    if (!repositories.hasValue()) {
      return [];
    }

    return repositories
      .value()
      .filter(repository => !repository.fork)
      .filter(repository => !repository.archived)
      .map(mapGitHubRepository);
  });

  readonly isLoading =
    this.githubService.repositories.isLoading;

  readonly error =
    this.githubService.repositories.error;

  getProjectById(id: string) {
    return this.projects().find(
      project => project.id === id
    );
  }
}