import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import {ColorService} from "../../services/color.services";
import {DomSanitizer} from "@angular/platform-browser";

@IonicPage()
@Component({
  selector: 'page-beer-detail',
  templateUrl: 'beer-detail.html',
})
export class BeerDetailPage {
  beer: any;

  constructor(public navParams: NavParams, public sanitizer: DomSanitizer, private colorService: ColorService) {
    this.beer= navParams.get('item');
  }

  getColor(item) {
    const style= this.colorService.getBeerColor(item);
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

  getDegreeColor(degree) {
    const style= this.colorService.getDegreeColor(parseFloat(degree));
    return this.sanitizer.bypassSecurityTrustStyle(style);
  }

}
