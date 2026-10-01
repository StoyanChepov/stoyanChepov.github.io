import {
  Component,
  computed,
  inject,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../core/models/profile';
import { Project } from '../../core/models/project';
import { ProjectService } from '../../core/services/project';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-home',
  imports: [ProjectCard, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

  private readonly projectService = inject(ProjectService);
  
  readonly profile = signal<Profile>({
    name: 'Stoyan Chepov',
    role: 'Software Developer',
    description:
      'I build modern web applications with a focus on clean architecture and great user experiences.',
    location: 'Bulgaria'
  });


  readonly introduction = computed(
    () =>
      `I'm ${this.profile().name}, a ${this.profile().role}.`
  );

  readonly projects = this.projectService.projects;
}