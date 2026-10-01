import {
  Service,
  signal
} from '@angular/core';

import { httpResource } from '@angular/common/http';

import { GitHubRepository } from '../models/github-repository';

@Service()
export class GitHubService {
  private readonly username = 'StoyanChepov';

  readonly repositories = httpResource<GitHubRepository[]>(
    () =>
      `https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`,
    {
      defaultValue: []
    }
  );
}