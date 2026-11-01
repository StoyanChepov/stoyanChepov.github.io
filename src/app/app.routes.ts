import { inject } from '@angular/core';
import { Router, Routes } from '@angular/router';

import { Home } from './pages/home/home';

const toSection = (fragment: string) => () =>
  inject(Router).createUrlTree(['/'], { fragment });

export const routes: Routes = [
  {
    path: '',
    component: Home
  },
  {
    path: 'projects/:id',
    loadComponent: () =>
      import('./pages/project-details/project-details')
        .then(m => m.ProjectDetails)
  },
  {
    path: 'projects',
    pathMatch: 'full',
    redirectTo: toSection('projects')
  },
  {
    path: 'contact',
    pathMatch: 'full',
    redirectTo: toSection('contact')
  },
  {
    path: '**',
    redirectTo: ''
  }
];
