import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BeerListPage } from './beer-list';

@NgModule({
  declarations: [
    BeerListPage,
  ],
  imports: [
    IonicPageModule.forChild(BeerListPage),
  ],
})
export class BeerListPageModule {}
