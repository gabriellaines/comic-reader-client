import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = false;
  private rootElement = document.querySelector('html') as HTMLElement;
  private body = document.getElementsByTagName('body')[0];

  getCurrentMode() {
    return this.isDarkMode ? 'Dark' : 'Light';
  }

  setCurrentModeState() {
    this.body.classList.contains('dark')
      ? (this.isDarkMode = true)
      : (this.isDarkMode = false);
  }

  switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isDarkMode) {
      this.body.classList.add('dark-theme');
      this.body.classList.add('dark');
      this.rootElement.classList.add('dark');
      this.rootElement.classList.add('dark-theme');
    } else {
      this.body.classList.remove('dark-theme');
      this.body.classList.remove('dark');
      this.rootElement.classList.remove('dark-theme');
      this.rootElement.classList.remove('dark');
    }
  }
}
