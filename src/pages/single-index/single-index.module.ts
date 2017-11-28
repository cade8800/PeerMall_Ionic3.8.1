import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SingleIndexPage } from './single-index';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SingleIndexPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(SingleIndexPage),
  ],
})
export class SingleIndexPageModule { }
