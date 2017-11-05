import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  data: any[];

  constructor(public http: Http) {}

  load() {
    return new Promise(resolve => {
      this.http.get('assets/data/beers.json')
        .map(res => res.json().beers)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  loadBar() {
    return new Promise(resolve => {
      this.http.get('assets/data/beers.json')
        .map(res => res.json().bars)
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

}
