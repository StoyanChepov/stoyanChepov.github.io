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
        stars:
            repository.stargazers_count,
        forks:
            repository.forks_count,
        updatedAt:
            repository.updated_at
    };
}