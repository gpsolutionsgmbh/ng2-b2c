/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsHttpService} from './gpts-http.service';

describe('GptsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GptsHttpService]
    });
  });

  it('should ...', inject([GptsHttpService], (service: GptsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
