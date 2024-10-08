import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplaySellerComponent } from './display-seller.component';

describe('DisplaySellerComponent', () => {
  let component: DisplaySellerComponent;
  let fixture: ComponentFixture<DisplaySellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisplaySellerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplaySellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
