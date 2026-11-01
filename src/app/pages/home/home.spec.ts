import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';
import { flushRepositories } from '../../testing/github-fixtures';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;
  let httpTesting: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    httpTesting = TestBed.inject(HttpTestingController);

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    TestBed.tick();
    flushRepositories(httpTesting, []);
    await fixture.whenStable();
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the introduction, projects and contact sections in order', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h1')?.textContent).toContain('Stoyan Chepov');

    const sectionIds = [
      ...element.querySelectorAll('#home, #projects, #contact')
    ].map(section => section.id);

    expect(sectionIds).toEqual(['home', 'projects', 'contact']);
  });
});
