import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-qq-chat',
  templateUrl: 'qq-chat.html',
})
export class QqChatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.init();
  }

  private init() {
    let qq = this.navParams.get('qq');
    if (!qq) return;
    let url = 'http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=' + qq;
    document.getElementsByClassName('qqconsultingIframe')[length - 1].setAttribute('src', url);
  }

}
