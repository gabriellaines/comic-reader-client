import { Routes } from '@angular/router';
import { ComicReaderComponent } from './comics/comic-reader/comic-reader.component';
import { ComicsPageComponent } from './comics/comics-page.component';
import { ComicsListComponent } from './comics/comics-list/comics-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'comics',
    pathMatch: 'full',
  },
  {
    path: 'comics',
    component: ComicsPageComponent,
    children: [
      {
        path: '',
        component: ComicsListComponent,
      },
      {
        path: ':id',
        component: ComicReaderComponent,
      },
    ],
  },
];
