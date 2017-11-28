import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineDetailPage } from './line-detail';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LineDetailPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(LineDetailPage),
  ],
})
export class LineDetailPageModule { }
