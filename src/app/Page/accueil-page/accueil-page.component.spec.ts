import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccueilPageComponent } from './accueil-page.component';

describe('AccueilPageComponent', () => {
  let component: AccueilPageComponent;
  let fixture: ComponentFixture<AccueilPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccueilPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccueilPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
