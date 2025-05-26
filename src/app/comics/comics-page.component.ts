import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ComicFormComponent } from './comic-form/comic-form.component';
import { LatestComicsComponent } from './latest-comics/latest-comics.component';
import { map, Observable } from 'rxjs';
import { Comic } from './comic';
import { ComicsService } from './comics.service';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-comic',
  imports: [
    NgIf,
    AsyncPipe,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ComicFormComponent,
    LatestComicsComponent,
  ],
  templateUrl: './comics.component.html',
  styleUrl: './comics.component.scss',
})
export class ComicsPageComponent {
  public comicsSubject: Observable<Comic[]> = new Observable<Comic[]>();
  public latestComics: Observable<Comic[]> = new Observable<Comic[]>();

  constructor(
    private readonly comicsService: ComicsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getComicsList();
    this.latestComics = this.comicsService.getLatest().pipe(
      map((comics: Comic[]) =>
        comics.map((comic: Comic) => ({
          ...comic,
          cover: this.comicsService.getComicCover(comic.url),
        }))
      )
    );
  }

  getComicsList() {
    this.comicsSubject = this.comicsService.getComics().pipe(
      map((comics: Comic[]) => {
        console.log('comics: ', comics);
        // to order asc by comic name (must improve)
        return comics.sort((a, b) =>
          a.originalName.localeCompare(b.originalName)
        );
      }),
      map((comics: Comic[]) =>
        comics.map((comic: Comic) => ({
          ...comic,
          cover: this.comicsService.getComicCover(comic.url),
        }))
      )
    );
  }
}
