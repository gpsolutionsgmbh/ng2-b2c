import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from "rxjs";
import {GptsHttpService} from "../../services/gpts-http.service";
import {GptsQueryEncoder} from "../../models/gpts-query-encoder";
import {URLSearchParams} from "@angular/http";
import {Router, NavigationExtras} from "@angular/router";

@Component({
  selector: 'app-hotels-search-form',
  templateUrl: './hotels-search-form.component.html',
  styleUrls: ['./hotels-search-form.component.css']
})
export class HotelsSearchFormComponent implements OnInit {
  auto;
  private searchTermStream = new Subject<string>();
  private endDate: Date;
  private startDate: Date;

  searchRequest: {
    cityId: number,
    startDate: string,
    endDate: string,
    rooms: string
  };
  cities: Observable<any[]>;
  self: HotelsSearchFormComponent;
  minStartDate: string;
  minEndDate: string;
  nights: number;

  static getNextDayOfWeek(date, dayOfWeek) {
    const resultDate = new Date(date.getTime());
    resultDate.setDate(date.getDate() + (7 + dayOfWeek - date.getDay()) % 7);
    return resultDate;
  }

  constructor(private http: GptsHttpService, private router: Router) {
    this.startDate = HotelsSearchFormComponent.getNextDayOfWeek(new Date(), 5);
    this.endDate = HotelsSearchFormComponent.getNextDayOfWeek(new Date(), 7);
    this.searchRequest = {
      cityId: null,
      startDate: this.startDate.toISOString().split('T')[0],
      endDate: this.endDate.toISOString().split('T')[0],
      rooms: 'adults:2'
    };
    const date = new Date();
    this.minStartDate = date.toISOString().split('T')[0];
    this.setNightsCount();
    this.changeStartDate();
    this.self = this;
  }

  locations(pattern) {
    this.searchTermStream.next(pattern);
  }

  ngOnInit() {
    const search = new URLSearchParams('', new GptsQueryEncoder());
    search.set('limitCities', '10');
    this.cities = this.searchTermStream
      .debounceTime(300)
      .distinctUntilChanged()
      .switchMap((pattern: string) => {
        search.set('pattern', pattern + '%');
        return this.http.get('locations', {'search': search})
          .map((response: any) => {
            return <any[]> response.cities;
          });
      });
  }

  locationsList(city: any): string {
    this.searchRequest.cityId = city.id;
    return city ? city.name : '';
  }

  search() {
    const navigationExtras: NavigationExtras = {
      queryParams: this.searchRequest
    };
    this.router.navigate(['/hotels'], navigationExtras);
  }

  changeStartDate() {
    try {
      this.startDate = new Date(this.searchRequest.startDate);
      this.endDate = new Date(this.searchRequest.endDate);
      const minEndDate = new Date(this.minEndDate || this.searchRequest.endDate);
      minEndDate.setTime(this.startDate.getTime() + 24 * 60 * 60 * 1000);
      this.minEndDate = minEndDate.toISOString().split('T')[0];
      if (minEndDate > this.endDate) {
        this.endDate.setTime(this.startDate.getTime() + this.nights * 24 * 60 * 60 * 1000);
        this.searchRequest.endDate = this.endDate.toISOString().split('T')[0];
      } else {
        this.setNightsCount();
      }
    } catch (error) {
    }
  }

  setNightsCount() {
    try {
      this.nights = Math.round(Math.abs((this.endDate.getTime() - this.startDate.getTime()) / (24 * 60 * 60 * 1000)));
    } catch (error) {
    }
  }

}
