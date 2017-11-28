import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { HotelDetailPage } from "../hotel-detail/hotel-detail";
import { DateTimeHelper } from '../../providers/utils';
import { ProductService } from '../../providers/productService';
import { SetOutCityPage } from '../set-out-city/set-out-city';
import { HotelSearchResultPage } from '../hotel-search-result/hotel-search-result';
import { Default_Product_Img } from '../../providers/constants';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";

@IonicPage()
@Component({
  selector: 'page-hotel-index',
  templateUrl: 'hotel-index.html',
  providers: [DateTimeHelper, ProductService, LoadCtrl]
})
export class HotelIndexPage extends BasePage {

  segment = "sale";

  hotelTypes: any = [];

  param: any = {
    // keyWord: '',
    checkIn: this.dateTimeHelper.addDay(new Date(), 0),
    checkOut: this.dateTimeHelper.addDay(new Date(), 1),
    pageIndex: 1,
    pageSize: 10,

    diffDayCut: 0,
    source: 'hotel'
  };

  saleParam: any = [];
  allParam: any = [];
  hotParam: any = [];

  allProduct: any = [];
  allIsLoad: boolean = true;
  saleProduct: any = [];
  saleIsLoad: boolean = true;
  hotProduct: any = [];
  hotIsLoad: any = true;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private dateTimeHelper: DateTimeHelper,
    private modalCtrl: ModalController,
    private productService: ProductService,
    private loading: LoadCtrl) {
    super();
    this.init();
  }

  private init() {

    let param = this.navParams.get('param');
    if (param) {
      this.param = param;
    } else {
      let that = this;
      this.getLocalCity(function (city: string) {
        that.param.destinations = city;
      });
    }
    this.getHotelStar();
    this.setDiffDayCut();

    this.resetParam();
    this.getSaleProduct('', true);

  }

  private setDiffDayCut() {
    this.param.diffDayCut = this.dateTimeHelper.getDateDiff(this.param.checkIn, this.param.checkOut);
  }

  private getHotelStar() {
    this.productService.getHotelStar().then(response => {
      if (response.Success) {
        this.hotelTypes = response.Result.ChildrenDicEntities;
      }
    }).catch();
  }

  goHotelDetail(productId: string) {
    this.navCtrl.push(HotelDetailPage, { Id: productId });
  }

  selectStartDate() {
    let daysConfig: [DayConfig];
    if (this.param.checkIn && this.param.checkOut) {
      daysConfig = [{
        date: this.param.checkIn,
        subTitle: '入住',
        cssClass: 'dayclass'
      }, {
        date: this.param.checkOut,
        subTitle: '退房',
        cssClass: 'dayclass'
      }];
    }
    // this.calendarCtrl.openCalendar({
    //   isRadio: true,
    //   weekdaysTitle: ['日', '一', '二', '三', '四', '五', '六'],
    //   monthTitle: "yyyy 年 MM 月",
    //   title: "选择入住日期",
    //   closeLabel: "完成",
    //   daysConfig: daysConfig
    // }).then(res => {
    //   this.param.checkIn = this.dateTimeHelper.addDay(new Date(res.date.time), 0);
    //   if (this.param.checkIn.getTime() >= this.param.checkOut.getTime()) {
    //     this.param.checkOut = this.dateTimeHelper.addDay(this.param.checkIn, 1);
    //   }
    //   this.setDiffDayCut();
    // }).catch((err) => {
    //   // console.log("没有选择");
    // });
    const options: CalendarModalOptions = {
      title: '选择入住日期',
      color: 'primary',
      pickMode: 'single',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      closeLabel: '取消',
      doneLabel: '完成',
      autoDone: true,
      daysConfig: daysConfig
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss(res => {
      if (!res) return;
      this.param.checkIn = this.dateTimeHelper.addDay(new Date(res.time), 0);
      if (this.param.checkIn.getTime() >= this.param.checkOut.getTime()) {
        this.param.checkOut = this.dateTimeHelper.addDay(this.param.checkIn, 1);
      }
      this.setDiffDayCut();
    });
  }
  selectEndDate() {
    let daysConfig: [DayConfig];
    if (this.param.checkIn && this.param.checkOut) {
      daysConfig = [{
        date: this.param.checkIn,
        subTitle: '入住',
        cssClass: 'dayclass'
      }, {
        date: this.param.checkOut,
        subTitle: '退房',
        cssClass: 'dayclass'
      }];
    }
    // this.calendarCtrl.openCalendar({
    //   isRadio: true,
    //   weekdaysTitle: ['日', '一', '二', '三', '四', '五', '六'],
    //   monthTitle: "yyyy 年 MM 月",
    //   title: "选择退房日期",
    //   closeLabel: "完成",
    //   daysConfig: daysConfig
    // }).then(res => {
    //   this.param.checkOut = this.dateTimeHelper.addDay(new Date(res.date.time), 0);
    //   if (this.param.checkIn.getTime() >= this.param.checkOut.getTime()) {
    //     this.param.checkIn = this.dateTimeHelper.addDay(this.param.checkOut, -1);
    //   }
    //   this.setDiffDayCut();
    // }).catch((err) => {
    //   // console.log("没有选择");
    // });
    const options: CalendarModalOptions = {
      title: '选择退房日期',
      color: 'primary',
      pickMode: 'single',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      closeLabel: '取消',
      doneLabel: '完成',
      autoDone: true,
      daysConfig: daysConfig
    };
    let myCalendar = this.modalCtrl.create(CalendarModal, {
      options: options
    });
    myCalendar.present();
    myCalendar.onDidDismiss(res => {
      if (!res) return;
      this.param.checkOut = this.dateTimeHelper.addDay(new Date(res.time), 0);
      if (this.param.checkIn.getTime() >= this.param.checkOut.getTime()) {
        this.param.checkIn = this.dateTimeHelper.addDay(this.param.checkOut, -1);
      }
      this.setDiffDayCut();
    });
  }

  selectArriveCity() {
    this.navCtrl.push(SetOutCityPage, { param: this.param });
  }

  private setAllParam() {
    // this.allParam = JSON.parse(JSON.stringify(this.param));
    // this.allParam.checkIn = (new Date(this.allParam.checkIn)).toLocaleDateString();
    // this.allParam.checkOut = (new Date(this.allParam.checkOut)).toLocaleDateString();
    // console.log(this.allParam);
    this.allParam = {
      pageIndex: 1,
      pageSize: 10
    };
  }
  private setSaleParam() {
    // this.saleParam = JSON.parse(JSON.stringify(this.param));
    // this.saleParam.sale = true;
    // this.saleParam.checkIn = (new Date(this.allParam.checkIn)).toLocaleDateString();
    // this.saleParam.checkOut = (new Date(this.allParam.checkOut)).toLocaleDateString();
    // console.log(this.saleParam);
    this.saleParam = {
      pageIndex: 1,
      pageSize: 10,
      sale: true
    };
  }
  private setHotParam() {
    // this.hotParam = JSON.parse(JSON.stringify(this.param));
    // this.hotParam.hot = true;
    // this.hotParam.checkIn = (new Date(this.allParam.checkIn)).toLocaleDateString();
    // this.hotParam.checkOut = (new Date(this.allParam.checkOut)).toLocaleDateString();
    // console.log(this.hotParam);
    this.hotParam = {
      pageIndex: 1,
      pageSize: 10,
      hot: true
    };
  }

  private resetParam() {

    this.setAllParam();
    this.setSaleParam();
    this.setHotParam();

    this.allProduct = [];
    this.allIsLoad = true;
    this.saleProduct = [];
    this.saleIsLoad = true;
    this.hotProduct = [];
    this.hotIsLoad = true;

    this.segment = "sale";
  }

  submitSelect() {
    // this.resetParam();
    // let loader = this.loadCtrl.create();
    // this.getSaleProduct('', loader);
    this.navCtrl.push(HotelSearchResultPage, { param: this.param });
  }
  allProductClick() {
    if (this.allProduct.length < 1) {
      this.setAllParam();
      this.getAllProduct('', true);
    }
  }
  hotProductClick() {
    if (this.hotProduct.length < 1) {
      this.setHotParam();
      this.getHotProduct('', true);
    }
  }


  private getSaleProduct(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getHotels(this.saleParam).then(response => {
      if (response.Success) {
        let pList = response.Result.Items;
        pList = this.setDefaultProductListImg(pList);
        this.saleParam.pageIndex++;

        if (pList.length < this.saleParam.pageSize) {
          this.saleIsLoad = false;
        } else { this.saleIsLoad = true; }
        this.saleProduct = this.saleProduct.concat(pList);
        if (isShowLoading) this.loading.hide();
      }
      if (infiniteScroll) infiniteScroll.complete();
    }).catch();
  }
  private getAllProduct(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getHotels(this.allParam).then(response => {
      if (response.Success) {
        let pList = response.Result.Items;
        pList = this.setDefaultProductListImg(pList);
        this.allParam.pageIndex++;

        if (pList.length < this.allParam.pageSize) {
          this.allIsLoad = false;
        } else { this.allIsLoad = true; }
        this.allProduct = this.allProduct.concat(pList);
        if (isShowLoading) this.loading.hide();
      }
      if (infiniteScroll) infiniteScroll.complete();
    }).catch();
  }
  private getHotProduct(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getHotels(this.hotParam).then(response => {
      if (response.Success) {
        let pList = response.Result.Items;
        pList = this.setDefaultProductListImg(pList);
        this.hotParam.pageIndex++;

        if (pList.length < this.hotParam.pageSize) {
          this.hotIsLoad = false;
        } else { this.hotIsLoad = true; }
        this.hotProduct = this.hotProduct.concat(pList);
        if (isShowLoading) this.loading.hide();
      }
      if (infiniteScroll) infiniteScroll.complete();
    }).catch();
  }

  private setDefaultProductListImg(productList: any) {
    if (!productList || productList.length < 0) return productList;
    productList.forEach(element => {
      if (!element.ImgUrl) {
        element.ImgUrl = Default_Product_Img;
      }
    });
    return productList;
  }
  saleScrollLoad(infiniteScroll) {
    this.getSaleProduct(infiniteScroll, false);
  }
  allScrollLoad(infiniteScroll) {
    this.getAllProduct(infiniteScroll, false);
  }
  hotScrollLoad(infiniteScroll) {
    this.getHotProduct(infiniteScroll, false);
  }

}
