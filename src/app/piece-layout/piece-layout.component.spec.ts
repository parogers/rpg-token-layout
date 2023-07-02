import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieceLayoutComponent } from './piece-layout.component';

describe('PieceLayoutComponent', () => {
  let component: PieceLayoutComponent;
  let fixture: ComponentFixture<PieceLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PieceLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PieceLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
