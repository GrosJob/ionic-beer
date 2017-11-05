import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import {Geolocation} from "@ionic-native/geolocation";
import {AlertController, LoadingController} from "ionic-angular";

declare var google;

@Injectable()
export class MapLocationProvider {
  map: any;
  loading: any;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionsService = new google.maps.DirectionsService;
  myMarker = new google.maps.Marker();
  myIcon = {
    url: "assets/icon/icon.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(25,30)
  };
  myLocation: {lat: number, lng: number};
  destination: {lat: number, lng: number};
  travelMode: any = 'DRIVING';
  travelIcon: any = "car";



  constructor(public http: Http, public loadingController: LoadingController, public geolocation: Geolocation, public alertCtrl: AlertController) {
  }

  init(map) {
    this.map = map;
    this.map.setTilt(45);
    this.directionsDisplay.setOptions( { suppressMarkers: true });
  }

  getMyLocation() {
    return this.geolocation.getCurrentPosition()
      .then(location => {
          this.myLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
          this.updateMapLocation();
        })
      .catch((error) => {
          console.log(error);
          this.showErrorOnLocation();
        });
  }

  getDistance(bar) {
    return new Promise ((resolve) => {
      let result = {dist: '', time: ''};
      let barLocation = {lat: parseFloat(bar.lat), lng: parseFloat(bar.lng)};

      let service = new google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [this.myLocation],
          destinations: [barLocation],
          travelMode: this.travelMode,
          unitSystem: google.maps.UnitSystem.METRIC,
          avoidHighways: false,
          avoidTolls: false
        }, function(response, status) {
          if (status == 'OK') {
            result.time = response.rows[0].elements[0].duration.text;
            result.dist = response.rows[0].elements[0].distance.text;
            Object.assign(result, bar);
            resolve(result);
          }});
    });
  }

  displayRoute() {
    if (this.destination) {
      this.loading = this.loadingController.create({content: "Calcul de l'itinéraire..."});
      this.loading.present();
      this.directionsDisplay.setMap(this.map);
      this.directionsService.route({
        origin: this.myLocation,
        destination: this.destination,
        travelMode: this.travelMode
      }, (response, status) => {
        if (status === 'OK') {
          this.directionsDisplay.setDirections(response);
          this.loading.dismissAll();
        } else {
          this.loading.dismissAll();
          window.alert('Directions request failed due to ' + status);
        }
      });
    }
  }

  updateMapLocation() {
    this.myIcon.url = "assets/icon/icon.png";
    this.myMarker.setOptions( {
      position: this.myLocation,
      icon: this.myIcon,
      map: this.map
    });
    this.map.setZoom(14);
    this.map.setCenter(this.myLocation);
  }


  addMarkenOnMap(position, imgUrl) {
    this.myIcon.url = imgUrl;
    new google.maps.Marker({
      position: position,
      icon: this.myIcon,
      map: this.map
    });
  }

  showErrorOnLocation() {
    let confirm = this.alertCtrl.create({
      title: "La localisation a échouéé",
      message: "Pour profiter de l'expérience au maximum, souhaitez vous être localisé dans le centre de Lille?",
      buttons: [
        { text: 'Non merci' },
        { text: 'Ok', handler: () => {
          this.myLocation = {lat: 50.629720, lng: 3.061409};
          this.updateMapLocation();
        }
        }
      ]
    });
    confirm.present();
  }

  clearRoute() {
    this.directionsDisplay.setMap(null);
    this.destination = null;
  }
}
