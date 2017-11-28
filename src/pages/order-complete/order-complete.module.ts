import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OrderCompletePage } from './order-complete';
import { ComponentsModule } from '../../components/components.module';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    OrderCompletePage,
  ],
  imports: [
    ComponentsModule,
    PipesModule,
    IonicPageModule.forChild(OrderCompletePage),
  ],
})
export class OrderCompletePageModule { }
