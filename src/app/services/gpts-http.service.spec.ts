/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsHttpService} from './gpts-http.service';
import {HttpModule, XHRBackend, RequestOptions} from "@angular/http";
import {environment} from "../../environments/environment";
import {GptsAuthService} from "./gpts-auth.service";
import {GptsHttpMockService} from "./gpts-http-mock.service";
export function httpServiceFactory(backend: XHRBackend,
                                   options: RequestOptions,
                                   auth: GptsAuthService): GptsHttpService {
    return new GptsHttpService(backend, options, auth);
}
describe('GptsHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GptsHttpService, GptsAuthService, {
        provide: GptsHttpService,
        useFactory: httpServiceFactory,
        deps: [XHRBackend, RequestOptions, GptsAuthService]
      }]
    });
  });

  it('should ...', inject([GptsHttpService], (service: GptsHttpService) => {
    expect(service).toBeTruthy();
  }));
});
