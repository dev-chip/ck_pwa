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
  alertText: string
  getLocationSuccessful = false
  getVenuesSuccessful = false
  previousInfoWindow = null
  callbacksDone = false
  mapReady = false  
  isOnline = false
  isErrorShown = false

  constructor(private http: HttpClient, private zone: NgZone) {
  }

  ngOnInit(){
    if(navigator.onLine){
      this.isOnline = true
    }
    else{
      this.isOnline = false
      this.alertText = "You're currently offline. Unable to load local bars."
      this.isErrorShown = true
    }
  }

  ngAfterViewInit() {
    if(this.isOnline){
      this.mapReady = true
      this.mapInit()
    }
  }

  buttonPressed() {
    /*
    Request user's geolocation.
    */
    this.venues = [];
    this.markers = [];
    navigator.geolocation.getCurrentPosition(
      this.locationSuccessCallback,
      this.locationErrorCallback,
      {timeout:10000}
     )
 }

 locationSuccessCallback = (position) => {
   /*
    Geolocation sucessfully retrieved. Set location and
    load venues.
   */
    this.lat = position.coords.latitude;
    this.lng = position.coords.longitude;
    this.getLocationSuccessful = true;

    // COMMENT FOR TESTING
    this.getLocalBars()
    // COMMENT FOR REAL
    //this.mockGetLocalBars()
 }

  locationErrorCallback = () => {
    /*
    Geolocation request failed.
    */
    this.lat = 40.73061;
    this.lng = -73.935242;
    this.getLocationSuccessful = false;
    this.callbacksDone = true
    this.loadMapAfterCallbacks()
  }

  mockGetLocalBars(){
    /*
    Mock API call.
    */
    console.log('Warning: Using mock FourSquare response data')
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

    // print mock venue response data
    console.log(items);
    console.log(this.venues);

    this.getVenuesSuccessful = true
    this.setVenueMarkers()
    this.callbacksDone = true
    this.loadMapAfterCallbacks()
  }

  getLocalBars() {
    /*
    Load local venues using the FourSquare API. 
    */
    console.log('Warning: Using FourSquare API (max 950 calls per day)')
    // compose url
    var url: string = "https://api.foursquare.com/v2/venues/explore"
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
            // construct venue objects and push to array
            var venue = item.venue
            this.venues.push(
              new Venue(
                venue.name,
                venue.location.lat,
                venue.location.lng,
                venue.location.distance))
          });
          
          // print API venue response data
          console.log(items);
          console.log(this.venues);

          // set venues
          this.setVenueMarkers()
          this.getVenuesSuccessful = true

          // set load map
          this.callbacksDone = true
          this.loadMapAfterCallbacks()
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('Error fetching bar data:', error);
          this.getVenuesSuccessful = false
          this.loadMapAfterCallbacks()
      }
    })
  }

  loadMapAfterCallbacks(){
    /*
    After the callbacks have completed, load the map.
    */
    this.callbacksDone = true
    this.mapInitializer();
  }
    
  setVenueMarkers() {
    /*
    Set venue map markers.
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
    /*
    Attaches a pop-up window for map markers.
    */
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

  mapInit(){
    // set map options
    var mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: 5
    };
    
    // load the map
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
  }

  mapInitializer() {
    /*
    Load the map (called only once).
    */
    var zoom: number

    // location permission denied
    if (this.getLocationSuccessful){
      this.alertText = ""
      this.isErrorShown = false
      zoom = 13
    } else{
      this.alertText = "Location access must be allowed to load local bars."
      this.isErrorShown = true
      zoom = 5
    }

    // load venues from FourSquare API failed
    if (this.getLocationSuccessful && !this.getVenuesSuccessful){
      this.alertText = "Error: Failed to load local bars."
      this.isErrorShown = true
    }

    // set map options
    var mapOptions: google.maps.MapOptions = {
      center: new google.maps.LatLng(this.lat, this.lng),
      zoom: zoom
    };
    
    // load the map
    this.map = new google.maps.Map(this.gmap.nativeElement, mapOptions);
    
    //load markers
    this.markers.forEach( (marker, i) => {
      marker.setMap(this.map);
    });
    
  }

}
