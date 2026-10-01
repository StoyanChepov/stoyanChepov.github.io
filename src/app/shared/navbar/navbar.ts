import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {
  readonly themeService = inject(ThemeService);
}