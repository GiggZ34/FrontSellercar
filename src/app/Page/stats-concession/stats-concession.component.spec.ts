import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsConcessionComponent } from './stats-concession.component';

describe('StatsConcessionComponent', () => {
  let component: StatsConcessionComponent;
  let fixture: ComponentFixture<StatsConcessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsConcessionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatsConcessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
