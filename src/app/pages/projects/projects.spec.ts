import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Projects } from './projects';
import {
  flushRepositories,
  mockRepository
} from '../../testing/github-fixtures';

describe('Projects', () => {
  let component: Projects;
  let fixture: ComponentFixture<Projects>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Projects],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(Projects);
    component = fixture.componentInstance;
    TestBed.tick();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    flushRepositories(httpTesting, []);

    expect(component).toBeTruthy();
  });

  it('should show projects once GitHub responds, without needing a search', async () => {
    flushRepositories(httpTesting, [
      mockRepository({ id: 1, name: 'portfolio' }),
      mockRepository({ id: 2, name: 'old-fork', fork: true }),
      mockRepository({ id: 3, name: 'archived-app', archived: true })
    ]);
    await fixture.whenStable();

    const titles = [
      ...(fixture.nativeElement as HTMLElement)
        .querySelectorAll('app-project-card h3')
    ].map(title => title.textContent?.trim());

    expect(titles).toEqual(['portfolio']);
  });

  it('should filter projects by language', async () => {
    flushRepositories(httpTesting, [
      mockRepository({ id: 1, name: 'portfolio', language: 'TypeScript' }),
      mockRepository({ id: 2, name: 'api', language: 'C#' })
    ]);
    await fixture.whenStable();

    component.languageControl.setValue('C#');
    await fixture.whenStable();

    expect(component.filteredProjects().map(project => project.title))
      .toEqual(['api']);
  });
});
