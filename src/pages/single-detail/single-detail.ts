import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { OrderPage } from '../order/order';
import { UesChatPage } from '../ues-chat/ues-chat';
import { SupplierStorePage } from '../supplier-store/supplier-store';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-single-detail',
  templateUrl: 'single-detail.html',
  providers: [ProductService, LoadCtrl]
})
export class SingleDetailPage extends BasePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl) {
    super();
    this.init();
  }

  productId: string = '';
  info: any = {};
  isShowShare: boolean = false;
  input: any = {};
  _daysConfig: any = [];

  private init() {
    this.productId = this.navParams.get('Id');
    if (!this.productId) return;

    this.loading.show();
    this.productService.getSingle(this.productId).then(response => {
      if (response.Success) {
        this.loading.hide();
        this.info = response.Result;
        this.info = this.setDefaultSlideImg(this.info);
      }
    }).catch(err => console.log(err));
  }

  private setInputInfo() {
    this.input = {
      PeerMallOrderInfoInput: {
        OrderType: 4096,
        ContactName: '',
        ContactPhone: '',
        ContactEmail: '',
        Invoice: {
          IsActive: false
        },
        Shipping: {
          IsActive: false
        },
        currencyCode: this.info.CurrencyCode,
        location: this.info.Location,
        supplierId: this.info.SupplierId,
        supplierName: this.info.SupplierName
      },
      OrderProductListInput: [{
        ProductId: this.info.ProductId,
        ProductName: this.info.ProductName,
        OrderProductDateListInput: [{
          DateId: this.info.ProductId,
          date: '',
          OrderProductDateQuoteListInput: [{
            name: this.info.ProductName,
            price: this.info.PeerPrice,
            currency: this.info.CurrencyCode,
            QuoteId: this.info.ProductId,
            PriceType: 0,
            Quantity: 1,
            remainingSeats: this.info.IsCountLimited ? ('余' + this.info.RestCount) : '有位'
          }]
        }]
      }],
      OrderVisitorListInput: []
    };
  }

  booking() {
    this.setInputInfo();
    this.navCtrl.push(OrderPage, { input: this.input });
  }

  uesConsult() {
    if (!this.info.ProductId) return;
    this.navCtrl.push(UesChatPage, {
      consult: {
        productType: '单项',
        productId: this.info.ProductId,
        productUrl: window.location.href.replace(window.location.search, "") + '?ptype=ticket&pid=' + this.info.ProductId,
        onlyGetContactUserId: true
      }
    });
  }

  goSupplyStore() {
    if (this.info.SupplierId)
      this.navCtrl.push(SupplierStorePage, { supplierId: this.info.SupplierId });
  }
}
