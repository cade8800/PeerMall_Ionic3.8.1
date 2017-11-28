import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from "../tabs/tabs";
import { ProductService } from '../../providers/productService';
import { LineDetailPage } from '../line-detail/line-detail';
import { HotelDetailPage } from '../hotel-detail/hotel-detail';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';

@IonicPage()
@Component({
  selector: 'page-order-complete',
  templateUrl: 'order-complete.html',
  providers: [ProductService]
})
export class OrderCompletePage {

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private productService: ProductService) {
    this.init();
  }

  productList: any = [];

  private init() {
    // let loader = this.loadCtrl.create();
    // loader.present();
    this.productService.getProducts({ pageIndex: 1, pageSize: 10, sale: true }).then(response => {
      console.log(response);
      if (response.Success) {
        this.productList = response.Result.Items;
        // loader.dismiss();
      }
    }).catch(err => console.log(err));
  }

  goProductDetail(type: string, id: string) {
    if (!id) return;
    if (type == '线路') {
      this.navCtrl.push(LineDetailPage, { Id: id });
    } else if (type == '酒店') {
      this.navCtrl.push(HotelDetailPage, { Id: id });
    } else if (type == '门票') {
      this.navCtrl.push(TicketDetailPage, { Id: id });
    }
  }

  goHome() {
    this.navCtrl.push(TabsPage);
  }

}
