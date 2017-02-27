import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {GptsHttpService} from "../../services/gpts-http.service";
import {URLSearchParams} from "@angular/http";
import {GptsQueryEncoder} from "../../models/gpts-query-encoder";
import {Observable} from "rxjs";
import {Hotel} from "../../interfaces/hotel";

@Component({
  selector: 'app-hotels-map',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.css']
})
export class HotelsComponent implements OnInit {

  filteredHotels: Observable<Hotel[]>;
  hotels: Hotel[];
  filters: any;
  filter: {
    maxPriceAmount: number;
  };
  loading: boolean;

  constructor(private route: ActivatedRoute, private http: GptsHttpService) {
    this.filters = {
      priceFrom: 0,
      priceTo: 0
    };
    this.filter = {
      maxPriceAmount: 0
    };
    this.loading = true;
  }

  ngOnInit() {
    this.filteredHotels = this.route.queryParams
      .switchMap((params: Params) => {
        const search = new URLSearchParams('', new GptsQueryEncoder());
        for (const key in params) {
          if (params.hasOwnProperty(key)) {
            search.set(key, params[key]);
          }
        }
        search.set('freeOnly', 'true');
        return this.http.get('searchAccommodation', {'search': search});
      })
      .map((result: any) => {
        this.hotels = result.hotelOffers.map(offer => {
          let minPrice = {amount: Number.MAX_VALUE, currency: ''};
          for (const roomOffer of offer.roomOffers) {
            let price = {amount: 0, currency: ''};
            for (const salesTerm of roomOffer.salesTerms) {
              if (salesTerm.type === 'CLIENT') {
                price = salesTerm.price;
                break;
              }
            }
            if (price.amount < minPrice.amount) {
              minPrice = price;
            }
          }
          return {
            location: {
              lat: +offer.info.latitude,
              lng: +offer.info.longitude,
            },
            minPrice: minPrice,
            name: offer.info.name
          };
        });
        this.filters = result.filters;
        this.filters.priceFrom = Math.ceil(this.filters.priceFrom);
        this.filters.priceTo = Math.ceil(this.filters.priceTo);
        this.filter.maxPriceAmount = this.filters.priceTo;
        this.loading = false;
        return this.hotels;
      });
  }

  onPriceSliderChange(event) {
    this.filter.maxPriceAmount = event.value;
    this.doFilter();
  }

  private doFilter() {
    this.filteredHotels = Observable.of(this.hotels.filter((hotel) => {
      return hotel.minPrice['amount'] < this.filter.maxPriceAmount;
    }));
  }

}
