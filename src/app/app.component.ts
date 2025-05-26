import {
  Component,
  ElementRef,
  inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './theme.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToggleSwitch, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public isDarkMode = false;
  private rootElement = document.querySelector('html') as HTMLElement;
  private body = document.getElementsByTagName('body')[0];

  ngOnInit() {
    this.setCurrentModeState();
  }

  getCurrentMode() {
    return this.isDarkMode ? 'Light' : 'Dark';
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
