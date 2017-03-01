/* tslint:disable:no-unused-variable */

import {TestBed, async} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HotelsSearchFormComponent} from "../hotels-search-form/hotels-search-form.component";
import {MaterialModule} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {environment} from "../../../environments/environment";
import {APP_BASE_HREF} from "@angular/common";
import 'hammerjs';
import {Routes, RouterModule} from "@angular/router";
import {XHRBackend, RequestOptions} from "@angular/http";
import {GptsAuthService} from "../../services/gpts-auth.service";
import {GptsHttpMockService} from "../../services/gpts-http-mock.service";
import {GptsHttpService} from "../../services/gpts-http.service";
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
  {path: '', component: HotelsSearchFormComponent}
];

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        HotelsSearchFormComponent
      ],
      imports: [
        FormsModule,
        MaterialModule,
        RouterModule.forRoot(routes, {initialNavigation: false})
      ],
      providers: [
        GptsAuthService,
        {
          provide: GptsHttpService,
          useFactory: httpServiceFactory,
          deps: [XHRBackend, RequestOptions, GptsAuthService]
        },
        {provide: APP_BASE_HREF, useValue : '/' }
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it('should have router-outlet', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('router-outlet') === null).toBe(false);
  }));
});
