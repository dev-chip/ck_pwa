import { Component, AfterViewInit , ViewChild, ElementRef, NgZone} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {} from 'googlemaps';

import mock_response from "src/assets/mock_foursquare_response.json";

class Venue {
  constructor(
    readonly name: string,
    readonly lat: number,
    readonly lng: number,
    readonly distance: number) {}
}

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

  markers :any[] = []
  totalAngularPackages: any
  errorMessage: any
  venues:Venue[] = []
  getLocationSuccessful = false
  geVenuesSuccessful = false
  previousInfoWindow = null
  

  constructor(private http: HttpClient, private zone: NgZone) {
  }

   ngOnInit(){
      // get location
      this.getLocation()
      if(this.getLocationSuccessful){
        // on success, get local bars
        this.mockGetLocalBars()
        if(this.geVenuesSuccessful){
          // on success, set venue markers
          this.setVenueMarkers()
        }
        else{
          console.log("Failed to load local bars.")
        }
      }
    else{
      console.log("Failed to aquire user location.")
    }
   }

  ngAfterViewInit() {
    this.mapInitializer();
  }

  getLocation() {
    /*
    Get user's geolocation. Set lat (latitude) and lng (longitude) values.
    */
    this.lat = 40.73061;
    this.lng = -73.935242;
    this.getLocationSuccessful = true
  }

  mockGetLocalBars(){
    var items = mock_response.response.groups[0].items
    items.forEach(item => {
      var venue = item.venue
      this.venues.push(
        new Venue(
          venue.name,
          venue.location.lat,
          venue.location.lng,
          venue.location.distance))
    });
    this.geVenuesSuccessful = true
  }

  getLocalBars() {
    /*
    Load Venues 
    */
    // compose url
    /*var url: string = "https://api.foursquare.com/v2/venues/explore"
      + "?client_id=" + "ZN0YNXQQOZ0HRI4QEBM2WJPSYMGYK2JPGULPDBUPUIDGWVZR"
      + "&client_secret=" + "SHWQUQTFI05ZMIZZVBXCXLFOE5JEWP3A1JQVNEWAII0XULXW"
      + "&v=20180323"
      + "&limit=" + "20"
      + "&ll=" + this.lat + "," + this.lng
      + "&query=" + "Cocktail%20Bar";
    console.log(url);

    // get request
    this.http.get<any>(url).subscribe({
      next: data => {
          var items = data.response.groups[0].items
          items.forEach(item => {
            var venue = item.venue
            this.venues.push(
              new Venue(
                venue.name,
                venue.location.lat,
                venue.location.lng,
                venue.location.distance))
          });
          this.geVenuesSuccessful = true
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('Error fetching bar data:', error);
          this.geVenuesSuccessful = false
      }
    })
    */
  }
    
  setVenueMarkers() {
    /*
    Set venue markers.
    */
    // create marker
    this.venues.forEach((venue, i) => {
      var pos = new google.maps.LatLng(venue.lat, venue.lng)
      var marker = new google.maps.Marker({
        position: pos,
        map: this.map ,
        label: {
          color: 'black',
          text: venue.name,
        },
        title: venue.name,
      })
      // add listener
      marker.addListener('click', () => {
        this.zone.run(() => { 
          this.displayVenueInfo(i);
          this.map.panTo(pos)
        })
      });

      // attach an on-click info window pop-up
      this.attachMarkerInfoWindow(marker, 
        '<h6>'+venue.name+'</h6>' +
        '<p>'+(venue.distance/1000).toFixed(1)+'km away</p>' +
        '<a target="_blank" jstcache="6" href="https://www.google.com/maps/search/?api=1&query=' + venue.lat + ',' + venue.lng + '"> <span>View on Google Maps</span> </a>');

      // push to array
      this.markers.push(marker)
    
    });
  }

  attachMarkerInfoWindow(
    marker: google.maps.Marker,
    secretMessage: string
  ) {
    const infoWindow = new google.maps.InfoWindow({
      content: secretMessage,
    });
  
    marker.addListener("click", () => {
      if(this.previousInfoWindow != null){
        this.previousInfoWindow.close()
      }
      infoWindow.open(marker.get("map"), marker);
      this.previousInfoWindow = infoWindow
    });
  }

  displayVenueInfo(venueIndex: number){
    // TODO: Show bar data
    console.log(venueIndex);
  }

  mapInitializer() {
    // set map options
    var mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 14
    };
    
    // load the map
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    
    //load markers
    this.markers.forEach( (marker, i) => {
      marker.setMap(this.map);
    });
  }

}
