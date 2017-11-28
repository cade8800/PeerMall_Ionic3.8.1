import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UesChatPage } from './ues-chat';

@NgModule({
  declarations: [
    UesChatPage,
  ],
  imports: [
    IonicPageModule.forChild(UesChatPage),
  ],
})
export class UesChatPageModule { }
