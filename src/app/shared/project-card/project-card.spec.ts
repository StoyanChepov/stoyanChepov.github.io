import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProjectCard } from './project-card';
import { Project } from '../../core/models/project';

describe('ProjectCard', () => {
  let component: ProjectCard;
  let fixture: ComponentFixture<ProjectCard>;

  const project: Project = {
    id: '42',
    title: 'portfolio',
    description: 'Personal portfolio built with Angular.',
    primaryLanguage: 'TypeScript',
    languages: {},
    githubUrl: 'https://github.com/StoyanChepov/portfolio',
    pageUrl: null,
    stars: 0,
    forks: 0,
    updatedAt: '2026-01-01T00:00:00Z'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
      providers: [provideRouter([])]
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('project', project);
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the project and link to its details page', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toContain('portfolio');
    expect(element.querySelector('.primary-language')?.textContent).toContain('TypeScript');
    expect(element.querySelector('a.button-primary')?.getAttribute('href')).toBe('/projects/42');
    expect(element.textContent).not.toContain('⭐');
    expect(element.textContent).not.toContain('Live demo');
  });

  it('should link to the live demo when the project has one', async () => {
    fixture.componentRef.setInput('project', {
      ...project,
      pageUrl: 'https://ring-scheduler-web.vercel.app'
    });
    await fixture.whenStable();

    const liveLink = [
      ...(fixture.nativeElement as HTMLElement).querySelectorAll('a')
    ].find(link => link.textContent?.includes('Live demo'));

    expect(liveLink?.getAttribute('href')).toBe('https://ring-scheduler-web.vercel.app');
  });

  it('should emit when the card is clicked', () => {
    let selected: Project | undefined;
    component.selected.subscribe(value => (selected = value));

    (fixture.nativeElement as HTMLElement)
      .querySelector<HTMLElement>('.project-card')
      ?.click();

    expect(selected).toEqual(project);
  });
});
