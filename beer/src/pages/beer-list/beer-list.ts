import {Component, ViewChild} from '@angular/core';
import {Content, IonicPage, Keyboard, NavController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";
import {DataProvider} from "../../providers/data/data";
import {ColorService} from "../../services/color.services";
import {BeerDetailPage} from "../beer-detail/beer-detail";


@IonicPage()
@Component({
  selector: 'page-beer-list',
  templateUrl: 'beer-list.html',
})
export class BeerListPage {
  @ViewChild(Content) content: Content;
  typeAlertOpts: any;
  beerTypes: any;
  types: Array<string>;
  data: any;
  beers: any = [];

  constructor(public navCtrl: NavController, public beerProvider: DataProvider, public sanitizer: DomSanitizer, private colorService: ColorService, public keyboard: Keyboard) {
    this.beerTypes = [
      { text: 'Blonde', value: 'blonde' },
      { text: 'Brune', value: 'brune' },
      { text: 'Ambrée', value: 'ambre' },
      { text: 'Blanche', value: 'blanche' },
      { text: 'Rouge', value: 'rouge' },
      { text: 'Aromatisée', value: 'arom' },
    ];

    this.typeAlertOpts = {
      title: 'Tu es plus blonde ou brune?',
      subTitle: 'Dis nous tout'
    };
  }

  ngOnInit() {
    this.loadBeer();
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

  loadBeer(){
    this.beerProvider.load()
      .then(data=> {
        this.data = data;
        this.beers = data;
      });
  }

  filterItems(ev: any) {
    let tmp = this.data
    let val = ev.target.value;

    if (val && val.trim() !== '') {
      tmp = tmp.filter(function (item) {
        return item.name_beer.toLowerCase().includes(val.toLowerCase());
      });
    }
    console.log("DONE");
    this.beers = tmp;
  }

  onSearch(event) {
    this.keyboard.close();
    console.log("ScrollOntTop");
    this.content.scrollToTop();
  }
}
