/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AtributoService } from './atributo.service';

describe('Service: Atributo', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AtributoService]
    });
  });

  it('should ...', inject([AtributoService], (service: AtributoService) => {
    expect(service).toBeTruthy();
  }));
});
