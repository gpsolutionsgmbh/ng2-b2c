/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsAuthService} from './gpts-auth.service';

describe('GptsAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GptsAuthService]
    });
  });

  it('should ...', inject([GptsAuthService], (service: GptsAuthService) => {
    expect(service).toBeTruthy();
  }));
});
