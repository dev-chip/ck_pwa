import { Component, AfterViewInit , ViewChild, ElementRef } from '@angular/core';
import {} from 'googlemaps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements AfterViewInit  {

  title = 'angular-gmap';
  @ViewChild('mapContainer', { static: false }) gmap: ElementRef;
  map: google.maps.Map;
  lat = 40.73061;
  lng = -73.935242;

  coordinates = new google.maps.LatLng(this.lat, this.lng);

  markers :any[] = []

  mapOptions: google.maps.MapOptions = {
    center: this.coordinates,
    zoom: 8
   };

  constructor() {}

  ngAfterViewInit() {
    this.mapInitializer();
  }

  getLocalBars() {
    this.markers.push(new google.maps.Marker({
      position: this.coordinates,
      map: this.map,
    }));
  }

  mapInitializer() {
    // load the map
    this.map = new google.maps.Map(this.gmap.nativeElement, this.mapOptions);
    
    //load markers
    this.getLocalBars()
    this.markers.forEach( (marker) => {
      marker.setMap(this.map);
    });
  }

}
