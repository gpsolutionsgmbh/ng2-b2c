import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule, XHRBackend, RequestOptions} from '@angular/http';
import {AppComponent} from '../components/app/app.component';
import {GptsAuthService} from "../services/gpts-auth.service";
import {GptsHttpService} from "../services/gpts-http.service";
import {MaterialModule} from "@angular/material";
import {HotelsSearchFormComponent} from '../components/hotels-search-form/hotels-search-form.component';
import {HotelsComponent} from '../components/hotels/hotels.component';
import {RoutingModule} from "./routing.module";
import {AgmCoreModule, GoogleMapsAPIWrapper} from "angular2-google-maps/core";
import {HotelsMapContentComponent} from '../components/hotels-map-content/hotels-map-content.component';
import 'hammerjs';
import {GptsHttpMockService} from "../services/gpts-http-mock.service";
import {environment} from "../../environments/environment";
export function httpServiceFactory(backend: XHRBackend,
                                   options: RequestOptions,
                                   auth: GptsAuthService): GptsHttpMockService | GptsHttpService {
  if (!environment.production && environment.mockApi) {
    return new GptsHttpMockService(backend, options, auth);
  } else {
    return new GptsHttpService(backend, options, auth);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    HotelsSearchFormComponent,
    HotelsComponent,
    HotelsMapContentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    RoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleApiKey
    })
  ],
  providers: [
    GptsAuthService,
    GoogleMapsAPIWrapper,
    {
      provide: GptsHttpService,
      useFactory: httpServiceFactory,
      deps: [XHRBackend, RequestOptions, GptsAuthService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
