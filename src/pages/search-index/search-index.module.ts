import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchIndexPage } from './search-index';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    SearchIndexPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(SearchIndexPage),
  ],
})
export class SearchIndexPageModule { }
