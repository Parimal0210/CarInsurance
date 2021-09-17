import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustPolicySavingCardsComponent } from './cust-policy-saving-cards.component';

describe('CustPolicySavingCardsComponent', () => {
  let component: CustPolicySavingCardsComponent;
  let fixture: ComponentFixture<CustPolicySavingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustPolicySavingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustPolicySavingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
