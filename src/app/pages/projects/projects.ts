import {
  Component,
  inject,
  computed,
  signal
} from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import {
  toSignal
} from '@angular/core/rxjs-interop';

import {
  debounceTime,
  distinctUntilChanged,
  map
} from 'rxjs';

import {
  ProjectService
} from '../../core/services/project';

import {
  ProjectCard
} from '../../shared/project-card/project-card';
import { Project } from '../../core/models/project';

@Component({
  selector: 'app-projects',
  imports: [
    ReactiveFormsModule,
    ProjectCard
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
  host: {
    '(document:keydown.escape)': 'closePreview()',
    '(document:keydown.arrowleft)': 'previousProject()',
    '(document:keydown.arrowright)': 'nextProject()'
  }
})
export class Projects {
  private readonly projectService =
    inject(ProjectService);

  readonly projects =
    this.projectService.projects;

  readonly selectedProject = signal<Project | null>(null);

  selectProject(project: Project): void {
    this.selectedProject.set(project);
  }

  readonly loading =
    this.projectService.isLoading;

  readonly error =
    this.projectService.error;

  readonly searchControl =
    new FormControl('', {
      nonNullable: true
    });

  readonly languageControl =
    new FormControl<string>('All', {
      nonNullable: true
    });


  private readonly searchTerm =
    toSignal(
      this.searchControl.valueChanges.pipe(
        debounceTime(300),
        map(value => value.trim().toLowerCase()),
        distinctUntilChanged()
      ),
      {
        initialValue: ''
      }
    );

  private readonly language =
    toSignal(
      this.languageControl.valueChanges,
      {
        initialValue: 'All'
      }
    );

  readonly filteredProjects = computed(() => {
    const term = this.searchTerm();
    const language = this.language();

    return this.projects().filter(project => {

      const matchesSearch =
        project.title
          .toLowerCase()
          .includes(term) ||

        project.description
          .toLowerCase()
          .includes(term);

      const matchesLanguage =
        language === 'All' ||
        project.primaryLanguage === language;

      return (
        matchesSearch &&
        matchesLanguage
      );
    });
  });

  readonly availableLanguages = computed(() => {
    const languages = new Set<string>();

    for (const project of this.projects()) {
      if (project.primaryLanguage) {
        languages.add(project.primaryLanguage);
      }
    }

    return [...languages].sort();
  });

  closePreview(): void {
    this.selectedProject.set(null);
  }

  readonly selectedProjectIndex = computed(() => {
    const selected = this.selectedProject();

    if (!selected) {
      return -1;
    }

    return this.filteredProjects().findIndex(
      project => project.id === selected.id
    );
  });

  previousProject(): void {
    const projects = this.filteredProjects();
    const index = this.selectedProjectIndex();

    if (index <= 0) {
      return;
    }

    this.selectedProject.set(
      projects[index - 1]
    );
  }

  nextProject(): void {
    const projects = this.filteredProjects();
    const index = this.selectedProjectIndex();

    if (
      index === -1 ||
      index >= projects.length - 1
    ) {
      return;
    }

    this.selectedProject.set(
      projects[index + 1]
    );
  }
}