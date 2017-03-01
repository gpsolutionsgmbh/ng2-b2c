/* tslint:disable:no-unused-variable */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {HotelsComponent} from './hotels.component';
import {AgmCoreModule, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {environment} from "../../../environments/environment";
import {MaterialModule} from "@angular/material";
import {HotelsMapContentComponent} from "../hotels-map-content/hotels-map-content.component";
import 'hammerjs';
import {RoutingModule} from "../../modules/routing.module";
import {HotelsSearchFormComponent} from "../hotels-search-form/hotels-search-form.component";
import {RouterModule, Routes} from "@angular/router";
import {APP_BASE_HREF} from "@angular/common";
import {GptsHttpService} from "../../services/gpts-http.service";
import {XHRBackend, RequestOptions} from "@angular/http";
import {GptsAuthService} from "../../services/gpts-auth.service";
import {GptsHttpMockService} from "../../services/gpts-http-mock.service";
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
  {path: 'hotels', component: HotelsComponent}
];


describe('HotelsComponent', () => {
  let component: HotelsComponent;
  let fixture: ComponentFixture<HotelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HotelsComponent, HotelsMapContentComponent],
      imports: [
        MaterialModule,
        RouterModule.forRoot(routes),
        AgmCoreModule.forRoot({
          apiKey: environment.googleApiKey
        })
      ],
      providers: [
        GoogleMapsAPIWrapper,
        GptsAuthService,
        {provide: APP_BASE_HREF, useValue : '/' },
        {
          provide: GptsHttpService,
          useFactory: httpServiceFactory,
          deps: [XHRBackend, RequestOptions, GptsAuthService]
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelsComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
