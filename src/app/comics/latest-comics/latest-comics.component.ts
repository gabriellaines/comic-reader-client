import { Component, Input } from '@angular/core';
import { Button } from 'primeng/button';
import { CarouselModule } from 'primeng/carousel';
import { Tag } from 'primeng/tag';
import { Comic } from '../comic';

export interface Product {
  id?: string;
  code?: string;
  name?: string;
  description?: string;
  price?: number;
  quantity?: number;
  inventoryStatus?: string;
  category?: string;
  image?: string;
  rating?: number;
}

@Component({
  selector: 'app-latest-comics',
  imports: [CarouselModule],
  templateUrl: './latest-comics.component.html',
  styleUrl: './latest-comics.component.scss',
})
export class LatestComicsComponent {
  @Input()
  public latestComics: Comic[] = [];

  responsiveOptions: any[] = [];

  ngOnInit() {
    this.responsiveOptions = [
      {
        breakpoint: '1400px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '1199px',
        numVisible: 3,
        numScroll: 1,
      },
      {
        breakpoint: '767px',
        numVisible: 2,
        numScroll: 1,
      },
      {
        breakpoint: '575px',
        numVisible: 1,
        numScroll: 1,
      },
    ];
  }

  getSeverity(status: string) {
    switch (status) {
      case 'INSTOCK':
        return 'success';
        break;
      case 'LOWSTOCK':
        return 'warn';
        break;
      case 'OUTOFSTOCK':
        return 'danger';
        break;
      default:
        return 'success';
    }
  }
}
