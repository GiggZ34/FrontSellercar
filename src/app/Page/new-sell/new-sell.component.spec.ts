import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSellComponent } from './new-sell.component';

describe('NewSellComponent', () => {
  let component: NewSellComponent;
  let fixture: ComponentFixture<NewSellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewSellComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
