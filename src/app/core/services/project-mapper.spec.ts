import { mapGitHubRepository } from './project-mapper';
import { mockRepository } from '../../testing/github-fixtures';

describe('mapGitHubRepository', () => {
  it('should use the website field for apps hosted outside GitHub Pages', () => {
    const project = mapGitHubRepository(
      mockRepository({
        name: 'ring-scheduler',
        homepage: 'https://ring-scheduler-web.vercel.app',
        has_pages: false
      })
    );

    expect(project.pageUrl).toBe('https://ring-scheduler-web.vercel.app');
  });

  it('should build the GitHub Pages url when no website is set', () => {
    const project = mapGitHubRepository(
      mockRepository({
        name: 'portfolio',
        full_name: 'StoyanChepov/portfolio',
        homepage: null,
        has_pages: true
      })
    );

    expect(project.pageUrl).toBe('https://stoyanchepov.github.io/portfolio/');
  });

  it('should have no page url without a website or GitHub Pages', () => {
    const project = mapGitHubRepository(
      mockRepository({ homepage: null, has_pages: false })
    );

    expect(project.pageUrl).toBeNull();
  });
});
