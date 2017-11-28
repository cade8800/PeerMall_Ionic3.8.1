import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { DateTimeHelper } from '../../providers/utils';
import { OrderPage } from '../order/order';
import { UesChatPage } from '../ues-chat/ues-chat';
import { SupplierStorePage } from '../supplier-store/supplier-store';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';
import { ToastCtrl } from '../../providers/toastController';
import { AccountService } from '../../providers/accountService';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";


@IonicPage()
@Component({
  selector: 'page-hotel-detail',
  templateUrl: 'hotel-detail.html',
  providers: [ProductService, DateTimeHelper, LoadCtrl]
})
export class HotelDetailPage extends BasePage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl,
    private modalCtrl: ModalController,
    private dateTimeHelper: DateTimeHelper,
    private toastCtrl: ToastCtrl) {
    super();
    this.init();
  }

  info: any = {};
  _daysConfig: any = [];
  startDay: any = this.dateTimeHelper.addDay(new Date(), 0);
  endDay: any = this.dateTimeHelper.addDay(new Date(), 1);
  diffDayCut: number = 1;
  input: any = {
    OrderProductListInput: [{
      OrderProductDateListInput: [{
        OrderProductDateQuoteListInput: []
      }]
    }]
  };
  targetDateList: any = [];
  isShowShare: boolean = false;

  private init() {
    let productId = this.navParams.get('Id');
    this.loading.show();
    this.productService.getHotel(productId).then(response => {
      if (response.Success) {
        this.info = response.Result;
        this.uutShareInit(this.info.SupplierId, this.info.ProductId, this.info.ProductName, 'hotel', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
        this.info = this.setDefaultSlideImg(this.info);
        this.setPriceOfCalendar();
        this.setInputInfo();
        this.getTargetDateList();
        let targetDateList = this.getTargetDateList();
        if (targetDateList.length == this.diffDayCut) {
          this.setDateListInput(targetDateList);
        }
        this.loading.hide();
      }
    }).catch();
  }

  public showShareLoading() {
    this.loading.showShareLoading();
  }

  private setPriceOfCalendar() {
    this.info.UseDates.forEach(element => {
      let item: DayConfig = {
        date: new Date(element.Date),
        subTitle: element.MinPrice,
        cssClass: 'dayclass'
      };
      this._daysConfig.push(item);
    });
  }
  private setInputInfo() {
    this.input = {
      PeerMallOrderInfoInput: {
        OrderType: 8,
        // OccupiedType: 1,
        ContactName: '',
        ContactPhone: '',
        ContactEmail: '',
        // InvoiceType: 0,
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
          DateId: 0,
          date: '',
          OrderProductDateQuoteListInput: []
        }]
      }],
      OrderVisitorListInput: []
    };
    this.setBookTimeInfo();
  }
  private setBookTimeInfo() {
    this.input.bookTimeInfo = {
      startDate: this.startDay,
      endDate: this.endDay,
      dateDiff: this.diffDayCut
    };
  }

  openCalendar() {
    // this.calendarCtrl.openCalendar({
    //   isRadio: false,
    //   weekdaysTitle: ['日', '一', '二', '三', '四', '五', '六'],
    //   monthTitle: "yyyy 年 MM 月",
    //   title: "选择入住~退房日期",
    //   closeLabel: "取消",
    //   daysConfig: this._daysConfig
    // }).then(res => {
    //   this.onSelectDate(res);
    // }).catch((err) => console.log(err));

    const options: CalendarModalOptions = {
      title: '选择入住退房时间',
      color: 'primary',
      pickMode: 'range',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      closeLabel: '取消',
      doneLabel: '完成',
      // autoDone: true,
      daysConfig: this._daysConfig
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss(date => {
      this.onSelectDate(date);
    });
  }

  private onSelectDate(dateObj: any) {
    if (!dateObj) return;

    if (dateObj.from.time < dateObj.to.time) {
      this.startDay = this.dateTimeHelper.addDay(new Date(dateObj.from.time), 0);
      this.endDay = this.dateTimeHelper.addDay(new Date(dateObj.to.time), 0);
    } else if (dateObj.from.time > dateObj.to.time) {
      this.startDay = this.dateTimeHelper.addDay(new Date(dateObj.to.time), 0);
      this.endDay = this.dateTimeHelper.addDay(new Date(dateObj.from.time), 0);
    } else if (dateObj.from.time = dateObj.to.time) {
      this.startDay = this.dateTimeHelper.addDay(new Date(dateObj.from.time), 0);
      this.endDay = this.dateTimeHelper.addDay(this.startDay, 1);
    }
    this.diffDayCut = this.dateTimeHelper.getDateDiff(this.startDay, this.endDay);
    this.setBookTimeInfo();

    ///重新选择日期后先清空报价项
    this.input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput = [];

    let targetDateList = this.getTargetDateList();
    if (targetDateList.length == this.diffDayCut) {
      this.setDateListInput(targetDateList);
    } else {
      this.toastCtrl.show("暂无合适房型");
    }
  }

  private getTargetDateList(): any {
    let dateList = [];
    this.info.UseDates.forEach(element => {
      let currentDate = new Date(element.Date);
      if (this.dateTimeHelper.isDateInSpecifiedPeriod(currentDate, this.startDay, this.endDay)) {
        dateList.push(element);
      }
    });
    return dateList;
  }

  private setDateListInput(dateList: any) {
    let quoteNameList = this.getQuoteNameList(dateList);
    if (quoteNameList.length > 0) {
      dateList = this.getValidDateQuoteList(dateList, quoteNameList);
      this.input.HotelDateList = dateList;
      this.setInputQuoteList(quoteNameList, dateList);
      if (this.input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput.length < 1) {
        this.toastCtrl.show("暂无合适房型");
      }
      // else {
      //   console.log(this.input);
      //   this.navCtrl.push(OrderPage, { input: this.input });
      // }
    } else {
      this.toastCtrl.show("暂无合适房型");
    }
  }

  private getQuoteNameList(dateList: any) {
    let quoteNameList = [];
    let quoteNameListOnly = [];
    dateList.forEach(day => {
      day.PriceItems.forEach(quote => {
        quoteNameList.push(quote.Name);
        if (quoteNameListOnly.indexOf(quote.Name) == -1) {
          quoteNameListOnly.push(quote.Name);
        }
      });
    });
    let quoteNameListEnd = [];
    quoteNameListOnly.forEach(n => {
      var qCount = quoteNameList.filter(function (item) {
        return item == n;
      }).length;
      if (qCount == this.diffDayCut) {
        quoteNameListEnd.push(n);
      }
    });
    return quoteNameListEnd;
  }

  /**
 * 过滤掉日期列表下无效的报价项
 * @param dateList 
 * @param quoteNameList 
 */
  private getValidDateQuoteList(dateList: any, quoteNameList: any) {
    dateList.forEach(day => {
      day.PriceItems = day.PriceItems.filter(function (item) {
        return (quoteNameList.indexOf(item.Name) > -1);
      });
    });
    return dateList;
  }

  private setInputQuoteList(quoteNameList, dateList) {
    let quoteList = [];
    quoteNameList.forEach(qName => {
      let quote = {
        name: qName,
        currency: this.info.CurrencyCode,
        QuoteId: '',
        PriceType: 0,
        Quantity: 1,
        price: this.getAveragePrice(qName, dateList),
        remainingSeats: this.setRemainingSeats(qName, dateList)
      };
      if (quote.price && quote.remainingSeats)
        quoteList.push(quote);
    });
    this.input.OrderProductListInput[0].OrderProductDateListInput[0].OrderProductDateQuoteListInput = quoteList;
  }

  private getAveragePrice(qname: string, dateList: any) {
    let total = 0;
    let isVaild: boolean = true;
    dateList.forEach(day => {
      day.PriceItems.forEach(quote => {
        if (quote.Name == qname) {
          if (quote.PeerPrice) total += quote.PeerPrice;
          else isVaild = false;
        }
      });
    });
    if (isVaild) {
      if (total > 0) return total / dateList.length;
      else return 0;
    } else return 0;
  }

  private setRemainingSeats(qname: string, dateList: any) {
    let residue = 0;
    let isMore: boolean = true;
    let isVaild: boolean = true;
    dateList.forEach(day => {
      day.PriceItems.forEach(quote => {
        if (quote.Name == qname) {
          if (quote.IsCountLimited) {
            isMore = false;
            if (quote.RestCount < 1) {
              isVaild = false;
            } else {
              if (residue == 0) {
                residue = quote.RestCount;
              } else {
                residue = residue < quote.RestCount ? residue : quote.RestCount;
              }
            }
          }
        }
      });
    });
    if (isVaild) {
      if (isMore) {
        return "有房";
      } else {
        return "余" + residue;
      }
    } else {
      return 0;
    }
  }

  booking() {
    // console.log(this.input);
    this.navCtrl.push(OrderPage, { input: this.input });
  }

  uesConsult() {
    if (!this.info.ProductId) return;
    this.navCtrl.push(UesChatPage, {
      consult: {
        productType: '酒店',
        productId: this.info.ProductId,
        productUrl: window.location.href.replace(window.location.search, "") + '?ptype=hotel&pid=' + this.info.ProductId,
        onlyGetContactUserId: true
      }
    });
  }

  goSupplyStore() {
    if (this.info.SupplierId)
      this.navCtrl.push(SupplierStorePage, { supplierId: this.info.SupplierId });
  }


  shareBtnClick() {
    if (!this.info.SupplierId) return;
    if (AccountService.CurrentUserInfo.AgencyId != this.info.SupplierId) {
      this.loading.showShareLoading();
      this.uutShareRetail(this.info.ProductId, this.info.ProductName, 'hotel', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
    } else {
      this.isShowShareCpm = true;
    }
  }
  peerShare() {
    if (!this.info.ProductId) return;
    this.loading.showShareLoading();
    this.uutSharePeer(this.info.ProductId, this.info.ProductName, 'hotel', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
  }
  retailShare() {
    if (!this.info.ProductId) return;
    if (this.info.PublishType == 1) return;
    this.loading.showShareLoading();
    this.uutShareRetail(this.info.ProductId, this.info.ProductName, 'hotel', this.info.Images.length > 0 ? this.info.Images[0].Path : '');
  }

}
