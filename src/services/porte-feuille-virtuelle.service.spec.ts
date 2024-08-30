import { TestBed } from '@angular/core/testing';

import { PorteFeuilleVirtuelleService } from './porte-feuille-virtuelle.service';

describe('PorteFeuilleVirtuelleService', () => {
  let service: PorteFeuilleVirtuelleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PorteFeuilleVirtuelleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
