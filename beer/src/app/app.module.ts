import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { HttpModule} from "@angular/http";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

//NATIVE
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from "@ionic-native/geolocation";

//PAGE
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { BeerListPage } from "../pages/beer-list/beer-list";
import { BeerDetailPage } from "../pages/beer-detail/beer-detail";
import { BarDetailPage } from "../pages/bar-detail/bar-detail";
import { LocationPage } from "../pages/location/location";
import { ProfilPage } from "../pages/profil/profil";

//DIRECTIVE / PROVIDER / SERVICE / COMPONENT
import { ParallaxHeaderDirective } from "../directives/parallax-header/parallax-header";
import { ParallaxContentDirective } from "../directives/parallax-content/parallax-content";
import { DataProvider } from '../providers/data/data';
import { MapLocationProvider } from '../providers/map-location/map-location';
import { ColorService } from "../services/color.services";
import { ExpandableHeaderComponent } from "../components/expandable-header/expandable-header";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ProfilPage,
    BeerListPage,
    BeerDetailPage,
    BarDetailPage,
    LocationPage,
    ParallaxHeaderDirective,
    ParallaxContentDirective,
    ExpandableHeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ProfilPage,
    BeerListPage,
    BeerDetailPage,
    BarDetailPage,
    LocationPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DataProvider,
    ColorService,
    Geolocation,
    MapLocationProvider
  ]
})
export class AppModule {}
