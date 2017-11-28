import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UesChatPage } from '../ues-chat/ues-chat';
// import { QqChatPage } from '../qq-chat/qq-chat';


@IonicPage()
@Component({
  selector: 'page-supplier-info',
  templateUrl: 'supplier-info.html',
})
export class SupplierInfoPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams) {
    this.init();
  }

  segment = "supplyCredit";
  info: any = {};
  contact: any = {};

  private init() {
    this.info = this.navParams.get('info');
    this.contact = this.navParams.get('contact');
  }

  uesChat(userId: number) {
    if (userId)
      this.navCtrl.push(UesChatPage, { userId: userId });
  }

  // qqChat(qq: number) {
  //   if (qq)
  //     this.navCtrl.push(QqChatPage, { qq: qq });
  // }

}