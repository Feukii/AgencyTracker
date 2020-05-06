import { TestBed } from '@angular/core/testing';

import { AgenciesDataService } from './agencies-data.service';

describe('AgenciesDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AgenciesDataService = TestBed.get(AgenciesDataService);
    expect(service).toBeTruthy();
  });
});
