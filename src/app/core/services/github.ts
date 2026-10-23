import {
    HttpClient,
    httpResource
} from '@angular/common/http';

import {
    inject,
    Service
} from '@angular/core';

import {
    GitHubRepository
} from '../models/github-repository';

import {
    GitHubLanguages
} from '../models/github-languages';

@Service()
export class GitHubService {

    private readonly http = inject(HttpClient);

    private readonly username =
        'StoyanChepov';

    readonly repositories =
        httpResource<GitHubRepository[]>(
            () =>
                `https://api.github.com/users/${this.username}/repos?per_page=100&sort=updated`,
            {
                defaultValue: []
            }
        );

    languages(
        repository: GitHubRepository
    ) {
        return httpResource<GitHubLanguages>(
            () => repository.languages_url,
            {
                defaultValue: {}
            }
        );
    }

    searchRepositories(
        query: string
    ) {
        return this.http.get<GitHubRepository[]>(
            'https://api.github.com/search/repositories',
            {
                params: {
                    q: query,
                    per_page: '10'
                }
            }
        );
    }
}