/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsHttpMockService} from './gpts-http-mock.service';
import {HttpModule, XHRBackend, RequestOptions, Http} from "@angular/http";
import {GptsAuthService} from "./gpts-auth.service";
export function httpServiceFactory(backend: XHRBackend,
                                   options: RequestOptions,
                                   auth: GptsAuthService): GptsHttpMockService {
  return new GptsHttpMockService(backend, options, auth);
}
describe('GptsHttpMockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GptsHttpMockService, GptsAuthService, {
        provide: GptsHttpMockService,
        useFactory: httpServiceFactory,
        deps: [XHRBackend, RequestOptions, GptsAuthService]
      }]
    });
  });

  it('should ...', inject([GptsHttpMockService], (service: GptsHttpMockService) => {
    expect(service).toBeTruthy();
  }));
});
