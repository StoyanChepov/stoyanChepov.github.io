import {
  Component,
  inject,
  signal
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  startWith
} from 'rxjs';

import { ProjectService } from '../../core/services/project';
import { ProjectCard } from '../../shared/project-card/project-card';

import {
  ReactiveFormsModule, FormControl,
  Validators
} from '@angular/forms';

@Component({
  selector: 'app-projects',
  imports: [ProjectCard, ReactiveFormsModule],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private readonly projectService = inject(ProjectService);

  readonly projects = this.projectService.projects;

  readonly searchControl = new FormControl('', {
    nonNullable: true,
    validators: [
      Validators.maxLength(30)
    ]
  });

  readonly filteredProjects = toSignal(
    this.searchControl.valueChanges.pipe(
      startWith(''),
      debounceTime(300),
      distinctUntilChanged(),
      map(searchTerm => {
        const term = searchTerm.trim().toLowerCase();

        if (!this.projects.hasValue()) {
          return [];
        }

        return this.projects
          .value()
          .filter(project =>
            project.title.toLowerCase().includes(term)
            || project.description.toLowerCase().includes(term)
            || project.technologies.some(technology =>
              technology.toLowerCase().includes(term)
            )
          );
      })
    ),
    {
      initialValue: []
    }
  );
}