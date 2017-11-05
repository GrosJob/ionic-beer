import {Component, ElementRef, ViewChild} from '@angular/core';
import {AlertController, FabContainer, LoadingController, NavController} from 'ionic-angular';
import {BarDetailPage} from "../bar-detail/bar-detail";
import {DataProvider} from "../../providers/data/data";
import {MapLocationProvider} from "../../providers/map-location/map-location";

declare let google;

@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  bars: any = [];
  allBars: any = [];
  loading: any;
  selectedBar: any;
  selectedTime: any;

  @ViewChild('map') mapElement: ElementRef;
  travelIcon: any = "car";

  constructor(public navCtrl: NavController, public loadingController: LoadingController,  public mapProvider: MapLocationProvider, public dataProvider: DataProvider, public alertCtrl: AlertController) {
    this.loading = this.loadingController.create({content: "Recherche des bars près de votre position..."});
    this.loading.present();
    this.mapProvider.getMyLocation().then(value => {
        this.loadBars();
      })
      .catch((error) => {
          this.loading.dismissAll();
        })
  }

  ionViewDidLoad(){
    let map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 10,
      center: {lat: 50.629720, lng: 3.061409},
      mapTypeControl: false,
      streetViewControl: false,
      zoomControl: false,
      fullscreenControl: false,
    });
    this.mapProvider.init(map);
  }

  loadBars(){
    this.dataProvider.loadBar()
      .then(data=> {
        this.allBars = data;
        this.computeDistance().then( tmp=> {
          this.bars = tmp;
          this.sortList();
          this.loading.dismissAll();
        })
      })
    .catch( (error) => {
      this.loading.dismissAll();
    });
  }

  computeDistance() {
    return new Promise((resolve) => {
      let tmp:any = [];
      for (let i = 0; i < this.allBars.length; i++) {
        this.mapProvider.getDistance(this.allBars[i]).then( result => {
          tmp.push(result);
          this.addPointerOnMap(result);
          if (i == this.allBars.length - 1) {
            resolve(tmp);
          }});
      }
    })
  }

  sortList() {
    this.bars.sort( function(bar1, bar2) {
      if (bar1.dist < bar2.dist) {
        return -1;
      } else if (bar1.dist > bar2.dist) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  addPointerOnMap(bar) {
    let position = {lat: parseFloat(bar.lat), lng: parseFloat(bar.lng)};
    let url = "assets/icon/bar_pointer.png";
    if (bar.pointer_bar){
      url = "assets/img/bar/" + bar.pointer_bar;
    }
    this.mapProvider.addMarkenOnMap(position, url);
  }

  //CLICK EVENT
  clickOnDestination(bar, destLat, destLng, slideItem, time) {
    this.selectedBar = bar;
    this.selectedTime = bar.time;
    slideItem.close();
    this.mapProvider.destination = {lat: parseFloat(bar.lat),  lng: parseFloat(bar.lng)};
    this.mapProvider.displayRoute();
  }

  showBarDetail(bar) {
    this.navCtrl.push(BarDetailPage, {
      item: bar
    });
  }

  changeTravelMode(travelMode, travelIcon, fab: FabContainer) {
    this.mapProvider.travelMode = travelMode;
    this.travelIcon = travelIcon;
    this.mapProvider.displayRoute();
    fab.close();
    this.computeDistance().then( tmp => {
      this.bars = tmp;
      this.sortList();
      if (this.selectedBar) { this.selectedBar = this.bars.find(x => x.name === this.selectedBar.name)}
    })
  }

  refreshLocation(fab : FabContainer) {
    this.loading = this.loadingController.create({content: "Recherche des bars près de votre position..."});
    this.loading.present();
    this.mapProvider.getMyLocation().then(value => {
      this.mapProvider.clearRoute();
      this.computeDistance().then( tmp => {
        this.bars = tmp;
        this.sortList();
        this.loading.dismissAll();
      })
    })
      .catch((error) => {
        this.loading.dismissAll();
      })
    fab.close();
  }

  setLocationOnLille(fab : FabContainer) {
    fab.close();
    let confirm = this.alertCtrl.create({
      title: "Forcer la localisation",
      message: "Pour profiter de l'expérience au maximum, souhaitez vous être localisé dans le centre de Lille?",
      buttons: [
        { text: 'Non merci' },
        { text: 'Ok', handler: () => {
          this.mapProvider.myLocation = {lat: 50.629720, lng: 3.061409};
          this.mapProvider.updateMapLocation();
          this.mapProvider.clearRoute();
          this.computeDistance().then( tmp => {
            this.bars = tmp;
            this.sortList();
          })}
        }
      ]
    });
    confirm.present();
  }
}
