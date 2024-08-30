import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemoignageAdminComponent } from './temoignage-admin.component';

describe('TemoignageAdminComponent', () => {
  let component: TemoignageAdminComponent;
  let fixture: ComponentFixture<TemoignageAdminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemoignageAdminComponent]
    });
    fixture = TestBed.createComponent(TemoignageAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
