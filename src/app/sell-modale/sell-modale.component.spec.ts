import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellModaleComponent } from './sell-modale.component';

describe('SellModaleComponent', () => {
  let component: SellModaleComponent;
  let fixture: ComponentFixture<SellModaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SellModaleComponent]
    });
    fixture = TestBed.createComponent(SellModaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
