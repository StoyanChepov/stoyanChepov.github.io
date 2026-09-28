import {
  Component,
  computed,
  inject
} from '@angular/core';

import { ActivatedRoute } from '@angular/router';

import { ProjectService } from '../../core/services/project';

@Component({
  selector: 'app-project-details',
  imports: [],
  templateUrl: './project-details.html',
  styleUrl: './project-details.scss'
})
export class ProjectDetails {
  private readonly route = inject(ActivatedRoute);
  private readonly projectService = inject(ProjectService);

  readonly projectId = this.route.snapshot.paramMap.get('id');

  readonly project = computed(() =>
    this.projectId
      ? this.projectService.getProjectById(this.projectId)
      : undefined
  );
}