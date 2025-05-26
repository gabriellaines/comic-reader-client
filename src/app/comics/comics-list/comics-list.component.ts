import { Component, OnInit } from '@angular/core';
import { ComicsService } from '../comics.service';
import { Comic } from '../comic';
import { map, Observable } from 'rxjs';
import { AsyncPipe, NgIf } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Button } from 'primeng/button';

@Component({
  selector: 'app-comics-list',
  imports: [AsyncPipe, NgIf, Button],
  templateUrl: './comics-list.component.html',
  styleUrl: './comics-list.component.scss',
})
export class ComicsListComponent implements OnInit {
  public comicsSubject: Observable<Comic[]> = new Observable<Comic[]>();

  constructor(
    private readonly comicsService: ComicsService,
    private readonly router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getComicsList();
  }

  getComicsList() {
    this.comicsSubject = this.comicsService.getComics().pipe(
      map((comics: Comic[]) => {
        console.log('comics: ', comics);
        // to order asc by comic name (must improve)
        return comics.sort((a, b) =>
          a.originalName.localeCompare(b.originalName)
        );
      })
    );
  }

  getReadPercentage(comic: Comic) {
    return this.comicsService.getReadPercentage(comic);
  }

  getComicCover(comicCoverPath: string) {
    const src = `http://172.22.159.191:3000/static-comic${comicCoverPath}`;
    return src;
  }

  readComic(comic: Comic) {
    console.log('route: ', this.route);
    this.router.navigate([comic.id], { relativeTo: this.route });
  }

  removeComic(id: string) {
    this.comicsService.removeComic(id).subscribe(() => this.getComicsList());
  }
}
