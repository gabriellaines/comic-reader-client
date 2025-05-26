import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ComicsService } from '../comics.service';
import { Comic } from '../comic';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-comic-reader',
  imports: [NgIf, RouterLink],
  templateUrl: './comic-reader.component.html',
  styleUrl: './comic-reader.component.scss',
})
export class ComicReaderComponent implements OnInit, OnDestroy {
  comicId: string = '';
  comic: any;
  currentPage = 0;

  constructor(
    private readonly route: ActivatedRoute,
    private router: Router,
    private comicsService: ComicsService
  ) {}

  ngOnInit() {
    this.comicId = this.route.snapshot.paramMap.get('id') ?? '';

    const nav = this.router.getCurrentNavigation();
    this.comic = nav?.extras?.state;

    if (!this.comic && this.comicId) {
      this.comicsService.getComic(this.comicId).subscribe((comic: Comic) => {
        this.comic = comic;
        console.log('comic from read page: ', this.comic);
      });
    }
  }

  getCurrentPageUrl() {
    return `http://172.22.159.191:3000/static-comic/${this.comic.slug}/${
      this.comic.pages[this.currentPage]
    }`;
  }

  nextPage() {
    if (this.currentPage <= this.comic.pages.length - 1) {
      this.currentPage++;
    }
  }

  prevPage() {
    if (this.currentPage > 0) {
      this.currentPage--;
    }
  }

  syncPage() {
    this.comicsService
      .updateCurrentPage(this.comic.id, this.currentPage)
      .subscribe();
  }

  ngOnDestroy() {
    this.syncPage();
  }
}
