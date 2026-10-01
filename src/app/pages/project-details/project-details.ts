import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import {
  DecimalPipe
} from '@angular/common';

import {
  httpResource
} from '@angular/common/http';

import {
  GitHubLanguages
} from '../../core/models/github-languages';

import {
  ProjectService
} from '../../core/services/project';

@Component({
  selector: 'app-project-details',
  imports: [DecimalPipe],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails {
  private readonly projectService =
    inject(ProjectService);

  readonly id =
    input.required<string>();

  readonly project =
    computed(() =>
      this.projectService
        .getProjectById(this.id())
    );

  readonly repository =
    computed(() => {
      const repositories =
        this.projectService.repositories;

      if (!repositories.hasValue()) {
        return undefined;
      }

      return repositories
        .value()
        .find(repository =>
          String(repository.id) === this.id()
        );
    });

  readonly languages =
    httpResource<GitHubLanguages>(
      () => {
        const repository =
          this.repository();

        return repository?.languages_url;
      },
      {
        defaultValue: {}
      }
    );

  readonly languageBreakdown = computed(() => {
    if (!this.languages.hasValue()) {
      return [];
    }

    const languages = this.languages.value();

    const total = Object.values(languages)
      .reduce((sum, bytes) => sum + bytes, 0);

    if (total === 0) {
      return [];
    }

    return Object.entries(languages)
      .map(([name, bytes]) => ({
        name,
        bytes,
        percentage: (bytes / total) * 100
      }))
      .sort((a, b) => b.bytes - a.bytes);
  });
}