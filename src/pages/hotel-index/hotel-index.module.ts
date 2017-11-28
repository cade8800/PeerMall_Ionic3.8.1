import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HotelIndexPage } from './hotel-index';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    HotelIndexPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(HotelIndexPage),
  ],
})
export class HotelIndexPageModule { }
