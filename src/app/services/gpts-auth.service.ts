import {Injectable} from '@angular/core';
import {URLSearchParams, Http, Response} from "@angular/http";
import {GptsQueryEncoder} from "../models/gpts-query-encoder";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable()
export class GptsAuthService {

  private authParams: URLSearchParams;
  private token: string;
  private login: string;
  private password: string;

  constructor(private http: Http) {
    this.authParams = new URLSearchParams('', new GptsQueryEncoder());
    this.authParams.set('apiKey', environment.api.apiKey);
    this.token = sessionStorage.getItem('token');
  }

  authorization(login = '', password = ''): Observable<boolean> {
    if (login.length > 0) {
      this.authParams.set('login', login);
    }
    if (password.length > 0) {
      this.authParams.set('password', password);
    }
    return this.http.get(environment.api.url + 'authorization', {'search': this.authParams})
      .map((response: Response) => {
        const token = response.json() && response.json().token;
        if (token) {
          this.token = token;
          this.login = login;
          this.password = password;
          sessionStorage.setItem('token', this.token);
          return true;
        } else {
          return false;
        }
      });
  }

  getTokenObservable(): Observable<string> {
    if (!this.token) {
      return this.authorization(this.login, this.password).map(() => {
        return this.token;
      });
    } else {
      return Observable.of(this.token);
    }
  }

  getToken(): string {
    return this.token;
  }

}
