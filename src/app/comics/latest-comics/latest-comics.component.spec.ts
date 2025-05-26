import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestComicsComponent } from './latest-comics.component';

describe('LatestComicsComponent', () => {
  let component: LatestComicsComponent;
  let fixture: ComponentFixture<LatestComicsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestComicsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestComicsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
