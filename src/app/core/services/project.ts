import { Service, signal } from '@angular/core';
import { httpResource } from '@angular/common/http';
import { Project } from '../models/project';

@Service()
export class ProjectService {
  readonly projects = httpResource<Project[]>(
    () => '/projects.json'
  );
}