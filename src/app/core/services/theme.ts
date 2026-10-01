import {
  effect,
  Service,
  signal
} from '@angular/core';

export type Theme = 'dark' | 'light';

@Service()
export class ThemeService {
  readonly theme = signal<Theme>('dark');

  constructor() {
    const savedTheme = localStorage.getItem('theme');

    if (savedTheme === 'dark' || savedTheme === 'light') {
      this.theme.set(savedTheme);
    }

    effect(() => {
      const theme = this.theme();

      document.documentElement.dataset['theme'] = theme;

      localStorage.setItem('theme', theme);
    });
  }

  toggle(): void {
    this.theme.update(current =>
      current === 'dark' ? 'light' : 'dark'
    );
  }
}