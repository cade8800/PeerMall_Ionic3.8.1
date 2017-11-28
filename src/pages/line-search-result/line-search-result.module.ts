import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LineSearchResultPage } from './line-search-result';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    LineSearchResultPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(LineSearchResultPage),
  ],
})
export class LineSearchResultPageModule {}
