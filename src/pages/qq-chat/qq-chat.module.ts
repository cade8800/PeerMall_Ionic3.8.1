import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QqChatPage } from './qq-chat';

@NgModule({
  declarations: [
    QqChatPage,
  ],
  imports: [
    IonicPageModule.forChild(QqChatPage),
  ],
})
export class QqChatPageModule {}
