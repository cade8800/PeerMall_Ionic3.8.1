import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShippingEditPage } from './shipping-edit';

@NgModule({
  declarations: [
    ShippingEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ShippingEditPage),
  ],
})
export class ShippingEditPageModule {}
