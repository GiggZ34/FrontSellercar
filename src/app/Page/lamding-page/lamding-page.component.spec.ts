import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LamdingPageComponent } from './lamding-page.component';

describe('LamdingPageComponent', () => {
  let component: LamdingPageComponent;
  let fixture: ComponentFixture<LamdingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LamdingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LamdingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
