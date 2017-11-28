import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketSearchResultPage } from './ticket-search-result';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TicketSearchResultPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TicketSearchResultPage),
  ],
})
export class TicketSearchResultPageModule {}
