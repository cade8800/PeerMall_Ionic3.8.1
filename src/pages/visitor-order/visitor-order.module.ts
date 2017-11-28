import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { VisitorOrderPage } from './visitor-order';

@NgModule({
  declarations: [
    VisitorOrderPage,
  ],
  imports: [
    IonicPageModule.forChild(VisitorOrderPage),
  ],
})
export class VisitorOrderPageModule { }
