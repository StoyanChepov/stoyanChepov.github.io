import { Routes } from '@angular/router';

import { Home } from './pages/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects')
        .then(m => m.Projects)
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details')
        .then(m => m.ProjectDetails)
  },
  {
    path: '**',
    redirectTo: ''
  }
];