import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { InvoiceService } from '../../providers/invoiceService';
import { InvoiceEditPage } from '../invoice-edit/invoice-edit';
import { OrderPage } from '../order/order';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-invoice',
  templateUrl: 'invoice.html',
  providers: [InvoiceService, LoadCtrl]
})
export class InvoicePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private invoiceService: InvoiceService,
    private alertCtrl: AlertController,
    private loading: LoadCtrl) {
    this.init();
  }

  invoiceList: any = [];
  input: any = {};

  private init() {
    this.input = this.navParams.get('input');

    this.loading.show();
    this.invoiceService.get().then(response => {
      // console.log(response);
      if (response.Success) {
        this.loading.hide();
        this.invoiceList = response.Result;
      }
    }).catch(err => console.log(err));
  }

  choice(item: any) {
    if (!item) return;
    this.input.PeerMallOrderInfoInput.Invoice = item;
    this.input.PeerMallOrderInfoInput.Invoice.IsActive = true;
    this.navCtrl.push(OrderPage, { input: this.input });
  }

  edit(item: any) {
    if (!item) return;
    this.navCtrl.push(InvoiceEditPage, { input: this.input, invoice: item });
  }

  delete(item: any) {
    // console.log(item);
    if (!item || !item.Id) return;
    let confirm = this.alertCtrl.create({
      title: '删除提示',
      message: '确定要删除当前发票信息吗？',
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
            this.invoiceService.delete(item.Id).then(response => {
              if (response.Success) {
                this.loading.hide();
                this.invoiceList.splice(this.invoiceList.indexOf(item), 1);
              }
            }).catch(err => console.log(err));
          }
        }
      ]
    });
    confirm.present();
  }

  add() {
    this.navCtrl.push(InvoiceEditPage, { input: this.input });
  }

}
