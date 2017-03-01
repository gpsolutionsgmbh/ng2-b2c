/* tslint:disable:no-unused-variable */

import {TestBed, async, inject} from '@angular/core/testing';
import {GptsAuthService} from './gpts-auth.service';
import {HttpModule, Http} from "@angular/http";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";

describe('GptsAuthService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpModule],
      providers: [GptsAuthService]
    });
  });

  it('should ...', inject([GptsAuthService], (service: GptsAuthService) => {
    expect(service).toBeTruthy();
  }));
});
