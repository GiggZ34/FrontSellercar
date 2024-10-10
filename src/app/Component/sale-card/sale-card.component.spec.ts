import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaleCardComponent } from './sale-card.component';

describe('SaleCardComponent', () => {
  let component: SaleCardComponent;
  let fixture: ComponentFixture<SaleCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SaleCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SaleCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
