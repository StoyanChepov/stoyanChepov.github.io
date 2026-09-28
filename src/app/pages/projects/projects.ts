import {
  Component,
  inject,
  signal
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
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
  imports: [ProjectCard],
  templateUrl: './projects.html',
  styleUrl: './projects.scss'
})
export class Projects {
  private readonly projectService = inject(ProjectService);

  readonly projects = this.projectService.projects;

  readonly search = signal('');

  private readonly search$ = toObservable(this.search);

  readonly filteredProjects = toSignal(
    this.search$.pipe(
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