import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelSearchResultPage } from './hotel-search-result';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HotelSearchResultPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(HotelSearchResultPage),
  ],
})
export class HotelSearchResultPageModule {}
