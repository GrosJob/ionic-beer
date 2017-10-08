import { Component } from '@angular/core';
import {IonicPage, NavParams, LoadingController, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {BeerDetailPage} from "../beer-detail/beer-detail";
import {ColorService} from "../../services/color.services";
import {DomSanitizer} from "@angular/platform-browser";


@IonicPage()
@Component({
  selector: 'page-bar-detail',
  templateUrl: 'bar-detail.html',
})
export class BarDetailPage {
  loading: any;
  beerList: any[] = [];
  bar: any;
  beersId: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private dataProvider: DataProvider, public loadingController: LoadingController, public sanitizer: DomSanitizer, private colorService: ColorService) {
    this.bar = navParams.get('item');
    this.beersId = this.bar.beer_list
    this.getBeerOnBar();

  }


  getBeerOnBar(){
    this.loading = this.loadingController.create({content: "Recupération des infos..."});
    this.loading.present();
    this.dataProvider.load()
      .then(data=> {
        let tmp: any =data;
        for (let beer of tmp) {
          if (this.beersId.indexOf(beer.id) != -1) {
            this.beerList.push(beer);
          }
        }
        this.loading.dismissAll();
      });
  }

  beerDetail(item) {
    this.navCtrl.push(BeerDetailPage, {
      item: item
    });
  }

  getColor(item) {
    const style = this.colorService.getBeerColor(item);
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }
}
