import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UrlHelper } from '../../providers/utils';
import { UesService } from '../../providers/uesService';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-ues-chat',
  templateUrl: 'ues-chat.html',
  providers: [UesService, LoadCtrl]
})
export class UesChatPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private uesService: UesService, private loading: LoadCtrl) { }

  ionViewDidLoad() {
    this.init();
  }

  // uesConsult: string = '#RoomChat/user/';
  uesChat: string = 'Home/GoToSingleChat?userId=';

  private init() {

    let url = UrlHelper.uesUrl();
    let userId = this.navParams.get('userId');
    let consult = this.navParams.get('consult');

    if (userId) {
      url = url + this.uesChat + userId;
      this.setIframeSrc(url);
    }
    else if (consult) {
      this.loading.show();
      this.uesService.getRoomNum(consult).then(response => {
        if (response.Success) {
          this.loading.hide();
          url = url + this.uesChat + response.Result;
          this.setIframeSrc(url);
        }
      }).catch(err => console.log(err));
    }
    else {
      // this.setIframeSrc(url);
      window.location.href = url;
    }
  }

  private setIframeSrc(url: string) {
    // document.getElementById('consultingIframe').setAttribute('src', url);
    document.getElementsByClassName('consultingIframe')[length - 1].setAttribute('src', url);
  }

}
