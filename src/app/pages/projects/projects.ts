import {
  Component,
  inject
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
  map,
  startWith
} from 'rxjs';

import { ProjectService } from '../../core/services/project';
import { ProjectCard } from '../../shared/project-card/project-card';

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

  readonly filteredProjects =
    toSignal(
      this.searchControl.valueChanges.pipe(
        startWith(''),
        debounceTime(300),
        distinctUntilChanged(),

        map(searchTerm => {
          const term =
            searchTerm.trim().toLowerCase();

          return this.projects()
            .filter(project =>
              project.title
                .toLowerCase()
                .includes(term)
              ||
              project.description
                .toLowerCase()
                .includes(term)
              ||
              project.technologies.some(
                technology =>
                  technology
                    .toLowerCase()
                    .includes(term)
              )
            );
        })
      ),
      {
        initialValue: []
      }
    );
}