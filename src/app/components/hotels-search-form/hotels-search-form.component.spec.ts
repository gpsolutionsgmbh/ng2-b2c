/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HotelsSearchFormComponent} from './hotels-search-form.component';
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import 'hammerjs';
import {XHRBackend, RequestOptions} from "@angular/http";
import {GptsAuthService} from "../../services/gpts-auth.service";
import {GptsHttpService} from "../../services/gpts-http.service";
import {environment} from "../../../environments/environment";
import {GptsHttpMockService} from "../../services/gpts-http-mock.service";
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
export function httpServiceFactory(backend: XHRBackend,
                                   options: RequestOptions,
                                   auth: GptsAuthService): GptsHttpMockService | GptsHttpService {
  if (!environment.production && environment.mockApi) {
    return new GptsHttpMockService(backend, options, auth);
  } else {
    return new GptsHttpService(backend, options, auth);
  }
}
const routes: Routes = [
  {path: '', component: HotelsSearchFormComponent},
];

describe('HotelsSearchFormComponent', () => {
  let component: HotelsSearchFormComponent;
  let fixture: ComponentFixture<HotelsSearchFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsSearchFormComponent],
      imports:[
        FormsModule,
        MaterialModule,
        RouterModule.forRoot(routes)
      ],
      providers: [
        GptsAuthService,
        {
          provide: GptsHttpService,
          useFactory: httpServiceFactory,
          deps: [XHRBackend, RequestOptions, GptsAuthService]
        },
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsSearchFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
