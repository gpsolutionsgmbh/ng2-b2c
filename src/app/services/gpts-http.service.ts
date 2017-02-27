import {Injectable} from '@angular/core';
import {Http, ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Headers} from "@angular/http";
import {Observable} from "rxjs";
import {GptsAuthService} from "./gpts-auth.service";
import {environment} from "../../environments/environment";

@Injectable()
export class GptsHttpService extends Http {

  constructor(backend: ConnectionBackend, defaultOptions: RequestOptions, private auth: GptsAuthService) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return this.auth.getTokenObservable().flatMap((token) => {
      let headers;
      if (url instanceof Request) {
        headers = url.headers;
        url.url = environment.api.url + url.url;
      } else {
        headers = new Headers();
        url = environment.api.url + url;
      }
      headers.set('Token', token);
      return super.request(url, options)
        .map(response => response.json())
        .catch(initialError => {
          if (initialError && initialError.status === 401) {
            return this.auth
              .authorization()
              .flatMap((authenticationResult: Boolean) => {
                if (authenticationResult) {
                  headers.set('Token', this.auth.getToken());
                  return super.request(url, options)
                    .map(response => response.json());
                }
                return Observable.throw(initialError);
              });
          } else {
            return Observable.throw(initialError);
          }
        });
    });
  }

}
