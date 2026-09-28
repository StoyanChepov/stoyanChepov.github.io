import { Service, signal } from '@angular/core';

import { Project } from '../models/project';

@Service()
export class ProjectService {
  readonly projects = signal<Project[]>([
    {
      id: '01',
      title: 'Personal Portfolio',
      description:
        'A modern portfolio built to explore Angular architecture and modern framework features.',
      technologies: ['Angular', 'TypeScript', 'SCSS'],
      githubUrl:
        'https://github.com/StoyanChepov/stoyanChepov.github.io'
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

  getProjectById(id: string): Project | undefined {
    return this.projects().find(project => project.id === id);
  }
}