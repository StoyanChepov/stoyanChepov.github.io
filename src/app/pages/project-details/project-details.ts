import {
  Component,
  computed,
  inject,
  input
} from '@angular/core';

import { ProjectService } from '../../core/services/project';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails {
  private readonly projectService = inject(ProjectService);

  readonly id = input.required<string>();

  readonly project = computed(() => {
    if (!this.projectService.projects.hasValue()) {
      return undefined;
    }

    return this.projectService.projects
      .value()
      .find(project => project.id === this.id());
  });
}