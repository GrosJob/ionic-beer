import { Component } from '@angular/core';
import {ProfilPage} from "../profil/profil";
import {BeerListPage} from "../beer-list/beer-list";
import {LocationPage} from "../location/location";
import {NavController} from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  listBeerPage: typeof BeerListPage;
  locationPage: typeof LocationPage;
  profilPage: typeof ProfilPage;

  constructor(public navCtrl: NavController) {
    this.profilPage = ProfilPage;
    this.listBeerPage = BeerListPage;
    this.locationPage = LocationPage;
  }

  changePage() {
    this.navCtrl.setRoot(this.listBeerPage);
  }
}
