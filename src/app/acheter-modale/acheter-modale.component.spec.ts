import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AcheterModaleComponent } from './acheter-modale.component';

describe('AcheterModaleComponent', () => {
  let component: AcheterModaleComponent;
  let fixture: ComponentFixture<AcheterModaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AcheterModaleComponent]
    });
    fixture = TestBed.createComponent(AcheterModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
