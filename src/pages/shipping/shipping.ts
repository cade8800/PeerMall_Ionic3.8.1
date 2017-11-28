import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { ShippingService } from '../../providers/shippingService';
import { OrderPage } from '../order/order';
import { ShippingEditPage } from '../shipping-edit/shipping-edit';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
    selector: 'page-shipping',
    templateUrl: 'shipping.html',
    providers: [ShippingService, LoadCtrl]
})
export class ShippingPage {

    constructor(public navCtrl: NavController,
        public navParams: NavParams,
        private shippingService: ShippingService,
        private loading: LoadCtrl,
        private alertCtrl: AlertController) {
        this.init();
    }

    input: any = {};
    shippingList: any = [];
    defaultShippingId: string = '';

    private init() {
        this.input = this.navParams.get('input');
        this.loading.show();
        this.shippingService.get().then(response => {
            if (response.Success) {
                this.shippingList = response.Result;
                this.setDefaultShipping();
                this.loading.hide();
            }
        }).catch(err => console.log(err));
    }

    private setDefaultShipping() {
        let ship = this.shippingList.filter(function (item) {
            return item.IsDefault == true;
        });
        this.defaultShippingId = ship[0] ? ship[0].Id : '';
    }

    choiceShipping(shipping: any) {
        if (!shipping) return;
        this.input.PeerMallOrderInfoInput.Shipping = shipping;
        this.input.PeerMallOrderInfoInput.Shipping.IsActive = true;
        this.navCtrl.push(OrderPage, { input: this.input });
    }

    addShipping() {
        this.navCtrl.push(ShippingEditPage, { input: this.input });
    }
    editShipping(item: any) {
        // console.log(item);
        if (!item) return;
        this.navCtrl.push(ShippingEditPage, { input: this.input, shipping: item });
    }
    deleteShipping(shipping: any) {
        // console.log(shipping);
        if (!shipping || !shipping.Id) return;

        let confirm = this.alertCtrl.create({
            title: '删除提示',
            message: '确定要删除当前邮寄地址吗？',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.loading.show();
                        this.shippingService.delete(shipping.Id).then(response => {
                            if (response.Success) {
                                this.loading.hide();
                                this.shippingList.splice(this.shippingList.indexOf(shipping), 1);
                            }
                        }).catch(err => console.log(err));
                    }
                }
            ]
        });
        confirm.present();
    }

}
