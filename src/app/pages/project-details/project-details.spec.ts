import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { ProjectDetails } from './project-details';
import {
  flushRepositories,
  mockRepository
} from '../../testing/github-fixtures';

describe('ProjectDetails', () => {
  let component: ProjectDetails;
  let fixture: ComponentFixture<ProjectDetails>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectDetails],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(ProjectDetails);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('id', '1');
    TestBed.tick();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    flushRepositories(httpTesting, []);

    expect(component).toBeTruthy();
  });

  it('should show a not found message for an unknown project', async () => {
    flushRepositories(httpTesting, []);
    await fixture.whenStable();

    expect((fixture.nativeElement as HTMLElement).textContent)
      .toContain('Project not found.');
  });

  it('should render the project and its language breakdown', async () => {
    const repository = mockRepository({ id: 1, name: 'portfolio' });

    flushRepositories(httpTesting, [repository]);
    // Let the repositories resource settle so the languages request starts.
    await Promise.resolve();
    TestBed.tick();

    httpTesting
      .expectOne(repository.languages_url)
      .flush({ TypeScript: 750, SCSS: 250 });
    await fixture.whenStable();

    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('portfolio');
    expect(element.querySelector('.back-link')?.getAttribute('href')).toBe('/#projects');

    const languages = [
      ...element.querySelectorAll('.language-header')
    ].map(header => header.textContent?.replace(/\s+/g, ' ').trim());

    expect(languages).toEqual(['TypeScript 75%', 'SCSS 25%']);
  });
});
