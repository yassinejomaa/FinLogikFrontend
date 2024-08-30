import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterPorteFeuilleComponent } from './ajouter-porte-feuille.component';

describe('AjouterPorteFeuilleComponent', () => {
  let component: AjouterPorteFeuilleComponent;
  let fixture: ComponentFixture<AjouterPorteFeuilleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjouterPorteFeuilleComponent]
    });
    fixture = TestBed.createComponent(AjouterPorteFeuilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
