import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleSearchResultPage } from './single-search-result';
import { PipesModule } from '../../pipes/pipes.module';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    SingleSearchResultPage,
  ],
  imports: [
    PipesModule,
    ComponentsModule,
    IonicPageModule.forChild(SingleSearchResultPage),
  ],
})
export class SingleSearchResultPageModule {}
