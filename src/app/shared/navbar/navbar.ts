import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  inject,
  signal
} from '@angular/core';
import { ViewportScroller } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';

import { ThemeService } from '../../core/services/theme';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
  host: {
    '(window:scroll)': 'updateActiveSection()',
    '(window:resize)': 'updateActiveSection()'
  }
})
export class Navbar {
  readonly themeService = inject(ThemeService);

  readonly sections = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'contact', label: 'Contact' }
  ];

  readonly activeSection = signal<string | null>(null);

  private readonly host = inject(ElementRef<HTMLElement>);

  constructor() {
    // Keep anchor scrolling from hiding section headings behind the sticky navbar.
    inject(ViewportScroller).setOffset(
      () => [0, this.host.nativeElement.offsetHeight]
    );

    inject(Router).events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        takeUntilDestroyed(inject(DestroyRef))
      )
      .subscribe(() =>
        requestAnimationFrame(() => this.updateActiveSection())
      );

    afterNextRender(() => this.updateActiveSection());
  }

  updateActiveSection(): void {
    const threshold =
      this.host.nativeElement.offsetHeight + window.innerHeight / 3;

    const atPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 2;

    let active: string | null = null;

    for (const { id } of this.sections) {
      const element = document.getElementById(id);

      if (!element) {
        continue;
      }

      if (atPageBottom || element.getBoundingClientRect().top <= threshold) {
        active = id;
      }
    }

    this.activeSection.set(active);
  }
}
