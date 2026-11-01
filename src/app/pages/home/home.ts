import {
  Component,
  computed,
  signal
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { Profile } from '../../core/models/profile';
import { Contact } from '../contact/contact';
import { Projects } from '../projects/projects';

@Component({
  selector: 'app-home',
  imports: [Projects, Contact, RouterLink],
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
}
