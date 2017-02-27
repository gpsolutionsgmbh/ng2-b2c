import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, RequestOptionsArgs} from "@angular/http";
import {Observable} from "rxjs";
import {SearchAccommodationMock} from "../mocks/search-accommodation.mock";
import {GptsAuthService} from "./gpts-auth.service";
import {LocationsMock} from "../mocks/locations.mock";


@Injectable()
export class GptsHttpMockService extends Http {

  private locations;
  private searchAccommodation;

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private auth: GptsAuthService) {
    super(backend, defaultOptions);
    this.locations = LocationsMock;
    this.searchAccommodation = SearchAccommodationMock;
  }

  /**
   *
   * @param url
   * @param options
   * @returns {any}
   */
  get(url: string, options?: RequestOptionsArgs) {
    return Observable.of(this[url]);
  }


}
