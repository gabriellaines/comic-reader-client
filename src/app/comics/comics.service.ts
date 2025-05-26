import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comic } from './comic';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ComicsService {
  private readonly baseUrl = 'http://172.22.159.191:3000';

  constructor(private readonly _httpClient: HttpClient) {}

  public getReadPercentage(comic: Comic) {
    return (comic.currentPage / comic.pageCount) * 100;
  }

  public getComicCover(comicCoverPath: string) {
    const src = `http://172.22.159.191:3000/static-comic${comicCoverPath}`;
    return src;
  }

  public getLatest() {
    return this._httpClient.get<Comic[]>(`${this.baseUrl}/comic/latest`);
  }

  public getComics() {
    return this._httpClient.get<Comic[]>(`${this.baseUrl}/comic`);
  }

  public getComic(id: string): Observable<Comic> {
    return this._httpClient.get<Comic>(`${this.baseUrl}/comic/${id}`);
  }

  public updateCurrentPage(id: string, page: number) {
    return this._httpClient.patch(`${this.baseUrl}/comic/${id}/page`, {
      currentPage: page,
    });
  }

  public uploadComic(form: FormData) {
    return this._httpClient.post(`${this.baseUrl}/comic`, form);
  }

  public removeComic(id: string) {
    return this._httpClient.delete(`${this.baseUrl}/comic/${id}`);
  }
}
