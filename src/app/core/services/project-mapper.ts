import { GitHubRepository } from '../models/github-repository';
import { Project } from '../models/project';

export function mapGitHubRepository(
    repository: GitHubRepository
): Project {
    return {
        id: String(repository.id),
        title: repository.name,
        description:
            repository.description ??
            'No description provided.',
        primaryLanguage:
            repository.language,
        languages: {},
        githubUrl:
            repository.html_url,
        pageUrl:
            getPageUrl(repository),
        stars:
            repository.stargazers_count,
        forks:
            repository.forks_count,
        updatedAt:
            repository.updated_at
    };
}

function getPageUrl(
    repository: GitHubRepository
): string | null {
    if (!repository.has_pages) {
        return null;
    }

    // Prefer the repo's "Website" field (covers custom domains).
    if (repository.homepage) {
        return repository.homepage;
    }

    const owner =
        repository.full_name.split('/')[0].toLowerCase();

    const baseUrl =
        `https://${owner}.github.io/`;

    // The <owner>.github.io repo is served from the root.
    if (repository.name.toLowerCase() === `${owner}.github.io`) {
        return baseUrl;
    }

    return `${baseUrl}${repository.name}/`;
}