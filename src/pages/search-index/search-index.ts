import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierPage } from "../supplier/supplier";
import { ProductService } from '../../providers/productService';
import { LineDetailPage } from '../line-detail/line-detail';
import { HotelDetailPage } from '../hotel-detail/hotel-detail';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { HotelSearchResultPage } from '../hotel-search-result/hotel-search-result';
import { LineSearchResultPage } from '../line-search-result/line-search-result';
import { TicketSearchResultPage } from '../ticket-search-result/ticket-search-result';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-search-index',
  templateUrl: 'search-index.html',
  providers: [ProductService, LoadCtrl]
})

export class SearchIndexPage {

  key: string = '';
  history: any = [];
  productList: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl) {
    this.init();
  }

  private init() {
    this.getLocalStorageHistory();
  }

  private getLocalStorageHistory() {
    let his = localStorage.getItem('retailSearchHistory');
    if (his) {
      this.history = JSON.parse(his);
    } else {
      localStorage.setItem('retailSearchHistory', '');
    }
  }

  lineSelect() {
    this.addSearchHistory('line');
    this.goSelectIndexPage('line', this.key);
  }
  hotelSelect() {
    this.addSearchHistory('hotel');
    this.goSelectIndexPage('hotel', this.key);
  }
  ticketSelect() {
    this.addSearchHistory('ticket');
    this.goSelectIndexPage('ticket', this.key);
  }
  supplierSelect() {
    this.addSearchHistory('supplier');
    this.goSelectIndexPage('supplier', this.key);
  }
  historyBtnClick(type: string, key: string) {
    if (type == 'all') {
      this.key = key;
      this.selectAllProduct();
    } else this.goSelectIndexPage(type, key);
  }

  private goSelectIndexPage(type: string, key: string) {
    switch (type) {
      case "line":
        this.navCtrl.push(LineSearchResultPage, { key: key }); break;
      case "hotel":
        this.navCtrl.push(HotelSearchResultPage, { key: key }); break;
      case 'ticket':
        this.navCtrl.push(TicketSearchResultPage, { key: key }); break;
      case 'supplier':
        this.navCtrl.push(SupplierPage, { key: key }); break;
    }
  }

  private addSearchHistory(type: string) {
    if (this.key) {
      let newHis = { type: type, key: this.key };
      this.history = [newHis].concat(this.history);
      if (this.history.length > 5) this.history.splice(5, (this.history.length - 5));
      localStorage.setItem('retailSearchHistory', JSON.stringify(this.history));
    }
  }

  clearHistory() {
    this.history = [];
    localStorage.setItem('retailSearchHistory', '');
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13 && this.key) {
      this.addSearchHistory('all');
      this.selectAllProduct();
    }
  }

  private selectAllProduct() {
    this.productList = [];
    this.loading.show();
    this.productService.getProducts({ pageIndex: 1, pageSize: 10, keyWord: this.key }).then(response => {
      if (response.Success) {
        this.loading.hide();
        this.productList = response.Result.Items;
      }
    }).catch();
  }

  goDetailPage(type: string, id: string) {
    if (!id) return;
    if (type == '线路') {
      this.navCtrl.push(LineDetailPage, { Id: id });
    } else if (type == '酒店') {
      this.navCtrl.push(HotelDetailPage, { Id: id });
    } else if (type == '门票') {
      this.navCtrl.push(TicketDetailPage, { Id: id });
    }
  }


}
