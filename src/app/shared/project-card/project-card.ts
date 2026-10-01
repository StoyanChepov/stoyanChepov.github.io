import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Project } from '../../core/models/project';

@Component({
  selector: 'app-project-card',
  imports: [RouterLink],
  templateUrl: './project-card.html',
  styleUrl: './project-card.scss'
})
export class ProjectCard {
  readonly project = input.required<Project>();
}