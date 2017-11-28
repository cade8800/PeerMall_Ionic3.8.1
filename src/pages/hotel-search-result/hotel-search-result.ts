import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { HotelDetailPage } from '../hotel-detail/hotel-detail';
import { DateTimeHelper } from '../../providers/utils';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';
import { CalendarModal, CalendarModalOptions, DayConfig } from "ion2-calendar";

@IonicPage()
@Component({
  selector: 'page-hotel-search-result',
  templateUrl: 'hotel-search-result.html',
  providers: [ProductService, DateTimeHelper, LoadCtrl]
})
export class HotelSearchResultPage {

  SortModel: string = '0';
  _SortModel: string = '0';

  price: number = 1;
  star: string = '';

  isSort: boolean = false;
  isScreen: boolean = false;
  isLoad: boolean = true;

  startDate;// = this.dateTimeHelper.addDay(new Date(), 0);
  endDate;// = this.dateTimeHelper.addDay(new Date(), 1);

  key: string = '';
  param: any = {};
  productList: any = [];
  hotelTypes: any = [];
  destinations: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadCtrl,
    private productService: ProductService,
    private modalCtrl: ModalController,
    private dateTimeHelper: DateTimeHelper) {
    this.init();
  }

  private init() {
    this.getHotelStar();
    this.setPushParam();
    this.resetParam();
    this.getProductList('', true);
  }

  private setPushParam() {
    let pushKey = this.navParams.get("key");
    if (pushKey)
      this.key = pushKey;
    let pushParam = this.navParams.get('param');
    if (pushParam) {
      this.startDate = pushParam.checkIn;
      this.endDate = pushParam.checkOut;
      this.destinations = pushParam.destinations;
      this.star = pushParam.hotelLvls;
      this.key = pushParam.keyWord;
    }
  }

  private getHotelStar() {
    this.productService.getHotelStar().then(response => {
      if (response.Success) {
        this.hotelTypes = response.Result.ChildrenDicEntities;
      }
    }).catch();
  }

  isSortToggle() {
    this.isScreen = false;
    this.isSort = !this.isSort;
  }
  isScreenToggle() {
    this.isSort = false;
    this.isScreen = !this.isScreen;
  }
  closeScreeningItem() {
    this.isScreen = false;
    this.isSort = false;
  }

  resetParam(noHideBlock?: boolean) {
    this.param = {
      pageIndex: 1,
      pageSize: 10,
      keyWord: this.key ? this.key : ''
    };
    if (this.startDate && this.endDate) {
      this.param.checkIn = this.startDate.toLocaleDateString();
      this.param.checkOut = this.endDate.toLocaleDateString();
    }
    if (this.star) {
      this.param.hotelLvls = this.star;
    }
    if (this.destinations) {
      this.param.destinations = this.destinations;
    }
    switch (this.price) {
      case 2: this.setPriceParam(0, 400); break;
      case 3: this.setPriceParam(400, 700); break;
      case 4: this.setPriceParam(700, 1000); break;
      case 5: this.setPriceParam(1000, 1300); break;
      case 6: this.setPriceParam(1300, 1800); break;
      case 7: this.setPriceParam(1800, 0); break;
    }
    if (this.SortModel && this.SortModel != '0') {
      this.param.orderByType = this.SortModel;
    }
    if (!noHideBlock) {
      this.productList = [];
      this.isLoad = true;
      this.isScreen = false;
      this.isSort = false;
    } else {
      this.price = 1;
      this.star = '';
      this.startDate = '';
      this.endDate = '';
    }
  }

  doInfinite(infiniteScroll) {
    this.getProductList(infiniteScroll, false);
  }

  private getProductList(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getHotels(this.param)
      .then(response => {
        if (response.Success) {
          let pList = response.Result.Items;
          pList = this.setDefaultProductListImg(pList);
          this.param.pageIndex++;
          if (pList.length < this.param.pageSize) {
            this.isLoad = false;
          } else { this.isLoad = true; }
          this.productList = this.productList.concat(pList);
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

  goHotelDetail(productId: string) {
    if (productId)
      this.navCtrl.push(HotelDetailPage, { Id: productId });
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {
      this.submitSearch();
    }
  }

  openCalendar() {
    let daysConfig: [DayConfig];
    if (this.startDate && this.endDate) {
      daysConfig = [{
        date: this.startDate,
        subTitle: '入住',
        cssClass: 'dayclass'
      }, {
        date: this.endDate,
        subTitle: '退房',
        cssClass: 'dayclass'
      }];
    }
    // this.calendarCtrl.openCalendar({
    //   isRadio: false,
    //   weekdaysTitle: ['日', '一', '二', '三', '四', '五', '六'],
    //   monthTitle: "yyyy 年 MM 月",
    //   title: "选择日期",
    //   closeLabel: "取消",
    //   daysConfig: daysConfig
    // }).then(res => {
    //   this.onSelectDate(res);
    // }).catch((err) => {
    //   // console.log("没有选择");
    // });

    const options: CalendarModalOptions = {
      title: '选择入住退房时间',
      color: 'primary',
      pickMode: 'range',
      monthFormat: 'YYYY 年 MM 月 ',
      weekdays: ['天', '一', '二', '三', '四', '五', '六'],
      closeLabel: '取消',
      doneLabel: '完成',
      // autoDone: true,
      daysConfig: daysConfig
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
    let sTime = dateObj.from.time;
    let eTime = dateObj.to.time;
    if (sTime >= eTime) {
      this.startDate = this.dateTimeHelper.addDay(new Date(sTime), 0);
      this.endDate = this.dateTimeHelper.addDay(new Date(sTime), 1);
    } else {
      this.startDate = this.dateTimeHelper.addDay(new Date(sTime), 0);
      this.endDate = this.dateTimeHelper.addDay(new Date(eTime), 0);
    }
  }

  submitSearch() {
    this.resetParam();
    this.getProductList('', true);
  }

  private setPriceParam(minPrice: number, maxPrice: number) {
    if (minPrice) this.param.priceStart = minPrice;
    if (maxPrice) this.param.priceEnd = maxPrice;
  }

  sortChange() {
    if (this.SortModel && this._SortModel != this.SortModel) {
      this._SortModel = this.SortModel;
      this.submitSearch();
    }
  }


}
