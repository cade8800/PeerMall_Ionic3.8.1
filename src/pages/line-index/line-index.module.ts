import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineIndexPage } from './line-index';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    LineIndexPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(LineIndexPage),
  ],
})
export class LineIndexPageModule {}
