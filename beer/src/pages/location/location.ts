import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, FabContainer, LoadingController, NavController} from 'ionic-angular';
import {Geolocation} from "@ionic-native/geolocation";
import {BarDetailPage} from "../bar-detail/bar-detail";
import {DataProvider} from "../../providers/data/data";

declare var google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  bars: any;
  loading: any;

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  myLocation: {lat: number, lng: number};
  destination: {lat: number, lng: number};
  myMarker: any;
  travelMode: any = 'DRIVING';
  travelIcon: any = "car";
  myIcon = {
    url: "assets/icon/icon.png", // url
    scaledSize: new google.maps.Size(40, 40), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(25,30)
  };

  constructor(public geolocation: Geolocation, public navCtrl: NavController, public alertCtrl: AlertController, public loadingController: LoadingController, public dataProvider: DataProvider) {
  }

  ionViewDidLoad(){
    this.initMap();
    this.directionsDisplay.setOptions( { suppressMarkers: true });
    this.getMyLocation();
  }


  loadBars(){
    this.dataProvider.loadBar()
      .then(data=> {
        this.bars = data;
        for (let bar of this.bars) {
          this.showBarOnMap(bar.lat, bar.lng, bar.pointer_bar);
        }
        this.loading.dismissAll();
      });
  }

  getDistance() {
    this.dataProvider.getDistanceWay("origin", "dest", this.travelMode)
      .then(data=> {
        console.log(data);
      });
  }


  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: {lat: 50.629720, lng: 3.061409},
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false,
    });
    this.myMarker = new google.maps.Marker();
    this.map.setTilt(45);
    this.directionsDisplay.setMap(this.map);
  }

  showBarOnMap(barLat, barLng, icon) {
    if (icon){
      this.myIcon.url = "assets/img/bar/" + icon;
    } else {
      this.myIcon.url = "assets/icon/bar_pointer.png";
    }
    new google.maps.Marker({
      position: {lat: parseFloat(barLat), lng: parseFloat(barLng)},
      icon: this.myIcon,
      map: this.map
    });
  }


  displayRoute() {
    if (this.destination) {
      this.loading = this.loadingController.create({content: "Calcul de l'itinéraire..."});
      this.loading.present();
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

  clickOnDestination(destLat, destLng, slideItem) {
    slideItem.close();
    this.destination = {lat: parseFloat(destLat),  lng: parseFloat(destLng)};
    this.displayRoute();
    this.getDistance();
  }

  showBarDetail(bar) {
    this.navCtrl.push(BarDetailPage, {
      item: bar
    });
  }

  changeTravelMode(travelMode, travelIcon, fab: FabContainer) {
    this.travelMode = travelMode;
    this.travelIcon = travelIcon;
    this.displayRoute();
    fab.close();
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

  getMyLocation() {
    this.loading = this.loadingController.create({content: "Searching for your location, please wait..."});
    this.loading.present();
    this.geolocation.getCurrentPosition()
      .then(
        location => {
          this.myLocation = {lat: location.coords.latitude, lng: location.coords.longitude};
          this.updateMapLocation();
          this.loadBars();
        }
      )
      .catch(
        (error) => {
          console.log(error)
          this.loading.dismissAll();
          this.showErrorOnLocation();
        }
      );
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
}
