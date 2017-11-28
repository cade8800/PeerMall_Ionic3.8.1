import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TicketIndexPage } from './ticket-index';
import { PipesModule } from '../../pipes/pipes.module';

@NgModule({
  declarations: [
    TicketIndexPage,
  ],
  imports: [
    PipesModule,
    IonicPageModule.forChild(TicketIndexPage),
  ],
})
export class TicketIndexPageModule { }
