import { TestBed } from '@angular/core/testing';

import { GerenciadorServiceService } from './gerenciador.service';

describe('GerenciadorServiceService', () => {
  let service: GerenciadorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GerenciadorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
