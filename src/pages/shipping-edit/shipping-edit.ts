import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShippingService } from '../../providers/shippingService';
import { ShippingPage } from '../shipping/shipping';
import { StringHelper } from '../../providers/utils';
import { LoadCtrl } from '../../providers/loadingController';
import { ToastCtrl } from '../../providers/toastController';

@IonicPage()
@Component({
  selector: 'page-shipping-edit',
  templateUrl: 'shipping-edit.html',
  providers: [ShippingService, LoadCtrl]
})
export class ShippingEditPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private shippingService: ShippingService,
    private toastCtrl: ToastCtrl,
    private loading: LoadCtrl) {
    this.init();
  }

  input: any = {};
  shipping: any = {
    ReceiverName: '',
    PhoneNumber: '',
    ProvinceCode: 1,
    CityCode: 1,
    Areas: '',
    Street: '',
    IsDefault: false
  };
  title: string;
  toast: any;

  private init() {
    this.input = this.navParams.get('input');
    if (this.navParams.get('shipping')) {
      this.title = '编辑';
      this.shipping = this.navParams.get('shipping');
      this.shipping.ProvinceCode = 1;
      this.shipping.CityCode = 1;
    } else {
      this.title = '新增';
    }
  }

  private editShipping() {
    this.loading.show();
    this.shippingService.update(this.shipping.Id, this.shipping).then(response => {
      // console.log(response);
      if (response.Success) {
        this.loading.hide();
        this.navCtrl.push(ShippingPage, { input: this.input });
      }
    }).catch(err => {
      // console.log(err);
      this.toastCtrl.show('请完善邮寄信息');
      this.loading.hide();
    });
  }

  private addShipping() {
    this.loading.show();
    this.shippingService.add(this.shipping).then(response => {
      // console.log(response);
      if (response.Success) {
        this.loading.hide();
        this.navCtrl.push(ShippingPage, { input: this.input });
      }
    }).catch(err => {
      // console.log(err);
      this.toastCtrl.show('请完善邮寄信息');
      this.loading.hide();
    });
  }

  complete() {
    console.log(this.shipping);
    if (!StringHelper.trim(this.shipping.ReceiverName) || !StringHelper.trim(this.shipping.PhoneNumber) || !StringHelper.trim(this.shipping.Areas) || !StringHelper.trim(this.shipping.Street)) {
      this.toastCtrl.show('请完善邮寄信息');
      return;
    }
    if (this.title == '编辑') {
      this.editShipping();
    } else if (this.title == '新增') {
      this.addShipping();
    }
  }

}
