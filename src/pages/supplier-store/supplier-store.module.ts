import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SupplierStorePage } from './supplier-store';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SupplierStorePage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(SupplierStorePage),
  ],
})
export class SupplierStorePageModule { }
