import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleDetailPage } from './single-detail';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SingleDetailPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(SingleDetailPage),
  ],
})
export class SingleDetailPageModule {}
