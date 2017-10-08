import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BarDetailPage } from './bar-detail';

@NgModule({
  declarations: [
    BarDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(BarDetailPage),
  ],
})
export class BarDetailPageModule {}
