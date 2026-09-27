import {
  Component,
  computed,
  signal
} from '@angular/core';

import { Profile } from '../../core/models/profile';
import { Project } from '../../core/models/project';
import { ProjectCard } from '../../shared/project-card/project-card';

@Component({
  selector: 'app-home',
  imports: [ProjectCard],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
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

  readonly projects = signal<Project[]>([
  {
    id: '01',
    title: 'Personal Portfolio',
    description:
      'A modern portfolio built to explore Angular architecture and modern framework features.',
    technologies: ['Angular', 'TypeScript', 'SCSS'],
    githubUrl: 'https://github.com/StoyanChepov/stoyanChepov.github.io'
  },
  {
    id: '02',
    title: 'Project Two',
    description:
      'A future project where we will experiment with APIs, RxJS and reactive data.',
    technologies: ['Angular', 'RxJS', 'REST API'],
    githubUrl: 'https://github.com/StoyanChepov'
  },
  {
    id: '03',
    title: 'Project Three',
    description:
      'A future project focused on forms, validation, authentication and routing.',
    technologies: ['Angular', 'Forms', 'Routing'],
    githubUrl: 'https://github.com/StoyanChepov'
  }
]);
}