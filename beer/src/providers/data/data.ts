import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class DataProvider {
  data: any[];

  constructor(public http: Http) {}

  getDistanceWay(origin, dest, mode) {
    return new Promise(resolve => {
      this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=metric&mode=bicycling&origins=50.629720,3.061409&destinations=50.635997,3.063217&key=AIzaSyDHZD0I5xznwOwiH6LG9cHw1xlVwdTW-Y0')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

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
