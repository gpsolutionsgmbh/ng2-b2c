/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsHttpMockService} from './gpts-http-mock.service';

describe('GptsHttpMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GptsHttpMockService]
    });
  });

  it('should ...', inject([GptsHttpMockService], (service: GptsHttpMockService) => {
    expect(service).toBeTruthy();
  }));
});
