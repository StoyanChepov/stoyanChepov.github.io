import {
  Component,
  inject,
  computed
} from '@angular/core';

import {
  FormControl,
  ReactiveFormsModule
} from '@angular/forms';

import {
  toSignal
} from '@angular/core/rxjs-interop';

import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs';

import {
  ProjectService
} from '../../core/services/project';

import {
  ProjectCard
} from '../../shared/project-card/project-card';

@Component({
  selector: 'app-projects',
  imports: [
    ReactiveFormsModule,
    ProjectCard
  ],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private readonly projectService =
    inject(ProjectService);

  readonly projects =
    this.projectService.projects;

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


  readonly filteredProjects =
    toSignal(
      combineLatest([
        this.searchControl.valueChanges.pipe(
          startWith('')
        ),

        this.languageControl.valueChanges.pipe(
          startWith('All')
        )
      ]).pipe(

        debounceTime(300),

        map(([searchTerm, language]) => {

          const term =
            searchTerm.trim().toLowerCase();

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
        })
      ),
      {
        initialValue: []
      }
    );

  readonly availableLanguages = computed(() => {
    const languages = new Set<string>();

    for (const project of this.projects()) {
      if (project.primaryLanguage) {
        languages.add(project.primaryLanguage);
      }
    }

    return [...languages].sort();
  });
}