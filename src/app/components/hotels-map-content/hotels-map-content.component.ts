import {Component, Input, OnChanges} from '@angular/core';
import {GoogleMapsAPIWrapper, MapsAPILoader} from 'angular2-google-maps/core';
import 'js-marker-clusterer/src/markerclusterer.js';
import {GoogleMap} from "angular2-google-maps/core/services/google-maps-types";
import {Hotel} from "../../interfaces/hotel";
import {Observable} from "rxjs";
declare const google;
declare const MarkerClusterer;

@Component({
  selector: 'app-hotels-map-content',
  templateUrl: './hotels-map-content.component.html',
  styleUrls: ['./hotels-map-content.component.css']
})
export class HotelsMapContentComponent implements OnChanges {

  @Input()
  hotels: Observable<Hotel[]>;
  map: GoogleMap;
  private markerCluster;

  constructor(private mapApiWrapper: GoogleMapsAPIWrapper, private loader: MapsAPILoader) {
  }

  ngOnChanges(changes: any) {
    if (changes.hotels.currentValue) {
      this.loader.load().then(() => {
        const self = this;
        const markers = [];
        const bounds = new google.maps.LatLngBounds();
        for (const hotel of changes.hotels.currentValue) {
          const infowindow = new google.maps.InfoWindow({
            content: `${hotel.name} <strong>${hotel.minPrice.amount} ${hotel.minPrice.currency}</strong>`
          });
          const marker = new google.maps.Marker({
            position: hotel.location,
            title: hotel.name
          });
          marker.addListener('click', function () {
            if (!self.map) {
              self.mapApiWrapper.getNativeMap().then((map) => {
                self.map = map;
                infowindow.open(self.map, marker);
              });
            } else {
              infowindow.open(self.map, marker);
            }
          });
          markers.push(marker);
          bounds.extend(marker.position);
        }
        if (!this.map) {
          this.mapApiWrapper.getNativeMap().then((map) => {
            this.map = map;
            this.createMarkerClusterer(markers, bounds);
          });
        } else {
          this.createMarkerClusterer(markers, bounds);
        }

      });
    }
  }

  private createMarkerClusterer(markers, bounds) {
    if (this.markerCluster) {
      this.markerCluster.clearMarkers();
    }
    this.markerCluster = new MarkerClusterer(this.map, markers,
      {imagePath: 'https://raw.githubusercontent.com/googlemaps/v3-utility-library/master/markerclustererplus/images/m'});
    this.map.fitBounds(bounds);
  }


}
