import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { InvoicePage } from "../invoice/invoice";
import { VisitorOrderPage } from '../visitor-order/visitor-order';
import { ShippingPage } from "../shipping/shipping";
import { AccountService } from '../../providers/accountService';
import { OrderService } from '../../providers/orderService';
import { OrderCompletePage } from '../order-complete/order-complete';
import { UesChatPage } from '../ues-chat/ues-chat';
import { SupplierStorePage } from '../supplier-store/supplier-store';
import { LoadCtrl } from '../../providers/loadingController';
import { ShippingService } from '../../providers/shippingService';
import { InvoiceService } from '../../providers/invoiceService';
import { ToastCtrl } from '../../providers/toastController';

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
  providers: [AccountService, OrderService, LoadCtrl, ShippingService, InvoiceService]
})
export class OrderPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastCtrl,
    private loading: LoadCtrl,
    private orderService: OrderService,
    private invoiceService: InvoiceService,
    private shippingService: ShippingService) {
    this.init();
  }

  input: any = {
    PeerMallOrderInfoInput: {},
    OrderVisitorListInput: [],
    OrderProductListInput: [{ OrderProductDateListInput: [] }]
  };
  total: number = 0;
  toast: any;

  private init() {
    this.input = this.navParams.get('input');
    if (!this.input) return;
    if (this.input) this.getTotal();
    this.setInputContect();
  }

  getTotal() {
    this.total = 0;
    this.input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput.forEach(element => {
      this.total += element.Quantity * element.price;
    });

    if (this.input.PeerMallOrderInfoInput.OrderType == 8) {
      this.total = this.total * this.input.bookTimeInfo.dateDiff;
    }
  }

  private setInputContect() {
    if (this.input.PeerMallOrderInfoInput.ContactName && this.input.PeerMallOrderInfoInput.ContactPhone) return;
    this.input.PeerMallOrderInfoInput.ContactName = AccountService.CurrentUserInfo.UserName;
    this.input.PeerMallOrderInfoInput.ContactPhone = AccountService.CurrentUserInfo.UserPhone;
    this.input.PeerMallOrderInfoInput.ContactEmail = AccountService.CurrentUserInfo.UserEmail;
  }

  public setDefaultInvoice() {
    if (!this.input.PeerMallOrderInfoInput.Invoice.IsActive) return;
    if (this.input.PeerMallOrderInfoInput.Invoice.Title) return;
    this.loading.show();
    this.invoiceService.get().then(response => {
      if (response.Success) {
        this.loading.hide();
        let invoiceList = response.Result;
        if (invoiceList.length > 0) {
          let defaultInvoice = invoiceList.filter(function (item) {
            return item.IsDefault == true;
          })[0];
          if (!defaultInvoice) defaultInvoice = invoiceList[0];
          defaultInvoice.IsActive = true;
          this.input.PeerMallOrderInfoInput.Invoice = defaultInvoice;
        }
      }
    }).catch();
  }

  public setDefaultShipping() {
    if (!this.input.PeerMallOrderInfoInput.Shipping.IsActive) return;
    if (this.input.PeerMallOrderInfoInput.Shipping.ReceiverName) return;
    this.loading.show();
    this.shippingService.get().then(response => {
      if (response.Success) {
        this.loading.hide();
        let shippingList = response.Result;
        if (shippingList.length > 0) {
          let defaultShipping = shippingList.filter(function (item) {
            return item.IsDefault == true;
          })[0];
          if (!defaultShipping) defaultShipping = shippingList[0];
          defaultShipping.IsActive = true;
          this.input.PeerMallOrderInfoInput.Shipping = defaultShipping;
        }
      }
    }).catch();
  }

  choiceShipping() {
    this.navCtrl.push(ShippingPage, { input: this.input });
  }

  goOrderVisitor() {
    this.navCtrl.push(VisitorOrderPage, { input: this.input });
  }

  goInvoiceInfo() {
    this.navCtrl.push(InvoicePage, { input: this.input });
  }

  booking() {
    if (AccountService.CurrentUserInfo.AgencyId == this.input.PeerMallOrderInfoInput.supplierId) {
      this.toastCtrl.show('预定失败：不可预定自己的商品');
      return;
    }
    if (this.total <= 0) {
      this.toastCtrl.show('请选择预定数量');
      return;
    }
    if (!this.input.PeerMallOrderInfoInput.ContactName || !this.input.PeerMallOrderInfoInput.ContactPhone) {
      this.toastCtrl.show('请完善联系人信息');
      return;
    }
    // if (this.input.OrderVisitorListInput.length < 1) {
    //   this.presentToast('请填写游客信息');
    //   return;
    // }
    if (this.input.PeerMallOrderInfoInput.Invoice.IsActive && !this.input.PeerMallOrderInfoInput.Invoice.Title) {
      this.toastCtrl.show('请填写发票信息');
      return;
    }
    if (this.input.PeerMallOrderInfoInput.Shipping.IsActive && !this.input.PeerMallOrderInfoInput.Shipping.ReceiverName) {
      this.toastCtrl.show('请填写邮寄地址');
      return;
    }

    if (this.input.PeerMallOrderInfoInput.OrderType == 8)
      this.submitOrder(this.setHotelInputQuoteList(JSON.parse(JSON.stringify(this.input))));
    else this.submitOrder(this.checkInput(JSON.parse(JSON.stringify(this.input))));
  }


  /**
   * 过滤掉预订数量为0的报价项
   * @param input 
   */
  private checkInput(input: any) {
    input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput =
      input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput.filter(function (item) {
        return item.Quantity
      });
    return input;
  }

  private setHotelInputQuoteList(input: any) {
    let quoteList = input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput;
    input.OrderProductListInput[0].OrderProductDateListInput = [];
    input.HotelDateList.forEach(day => {
      let newDate = {
        DateId: day.DateIdFromProductCenter,
        OrderProductDateQuoteListInput: []
      };
      day.PriceItems.forEach(quote => {
        let newQuote = {
          QuoteId: quote.QuoteIdFromProductCenter,
          PriceType: 0,
          Quantity: this.getHotelQuantity(quote.Name, quoteList),
          Price: quote.PeerPrice
        };
        if (newQuote.Quantity) {
          newDate.OrderProductDateQuoteListInput.push(newQuote);
        }
      });
      if (newDate.OrderProductDateQuoteListInput.length > 0)
        input.OrderProductListInput[0].OrderProductDateListInput.push(newDate);
    });
    return input;
  }

  private getHotelQuantity(qname, quoteList) {
    let q = quoteList.filter(function (item) {
      return item.name == qname;
    })[0];
    if (q.remainingSeats == "有房") {
      return q.Quantity;
    } else {
      let remain = q.remainingSeats.split('余')[1];
      if (q.Quantity > remain) {
        return 0;
      } else {
        return q.Quantity;
      }
    }
  }

  private submitOrder(input: any) {
    this.loading.showDialog();
    this.orderService.submit(input).then(response => {
      if (response.Success) {
        this.navCtrl.push(OrderCompletePage);
      }
      this.loading.hide();
    }).catch(err => console.log(err));
  }

  uesConsult() {
    let productType = '';
    switch (this.input.PeerMallOrderInfoInput.OrderType) {
      case 2: productType = '线路'; break;
      case 4: productType = '门票'; break;
      case 8: productType = '酒店'; break;
      case 4096: productType = '单项'; break;
    }
    if (!productType) return;
    let productId = this.input.OrderProductListInput[0].ProductId;
    if (!productId) return;
    this.navCtrl.push(UesChatPage, {
      consult: {
        productType: productType,
        productId: productId,
        productUrl: window.location.href.replace(window.location.search, "") + '?ptype=line&pid=' + productId,
        onlyGetContactUserId: true
      }
    });
  }

  goSupplyStore() {
    if (this.input.PeerMallOrderInfoInput.supplierId)
      this.navCtrl.push(SupplierStorePage, { supplierId: this.input.PeerMallOrderInfoInput.supplierId });
  }

}
