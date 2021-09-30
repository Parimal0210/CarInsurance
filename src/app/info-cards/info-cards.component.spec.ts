import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoCardsComponent } from './ic';

describe('InfoCardsComponent', () => {
  let component: InfoCardsComponent;
  let fixture: ComponentFixture<InfoCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
