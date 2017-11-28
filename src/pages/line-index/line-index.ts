import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetOutCityPage } from '../set-out-city/set-out-city';
import { ArriveAtCityPage } from '../arrive-at-city/arrive-at-city';
import { ProductService } from '../../providers/productService';
import { LineDetailPage } from '../line-detail/line-detail';
import { Default_Product_Img } from '../../providers/constants';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-line-index',
  templateUrl: 'line-index.html',
  providers: [ProductService, LoadCtrl]
})
export class LineIndexPage extends BasePage {

  segment = "sale";
  departureCity: string = '广州市';
  arriveCity: string = '';
  key: string = '';
  subType: string = '';

  allProduct: any = [];
  allIsLoad: boolean = true;
  saleProduct: any = [];
  saleIsLoad: boolean = true;
  hotProduct: any = [];
  hotIsLoad: any = true;

  allParam: any = {};
  saleParam: any = {};
  hotParam: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl) {
    super();
    this.init();
  }

  private init() {
    this.key = this.navParams.get("key");
    this.subType = this.navParams.get('subType');
    let pushParam = this.navParams.get('param');
    if (pushParam) this.setPushParam(pushParam);
    else {
      let that = this;
      this.getLocalCity(function (city: string) {
        that.departureCity = city;
      });
    }

    this.submitSelect();
  }

  private submitSelect() {
    this.setSearchParam();
    this.getSaleProduct('', true);
  }

  private getPushParam(): any {
    return {
      key: this.key,
      setOut: this.departureCity,
      arrive: this.arriveCity,
      source: 'index'
    };
  }
  private setPushParam(param: any) {
    this.key = param.key;
    this.departureCity = param.setOut;
    this.arriveCity = param.arrive;
  }

  goLineDetail(productId: string) {
    this.navCtrl.push(LineDetailPage, { Id: productId });
  }

  private setSearchParam() {
    this.setAllParam();
    this.setHotParam();
    this.setSaleParam();

    // if (this.departureCity) {
    //   this.allParam.departurePlace = this.departureCity;
    //   this.saleParam.departurePlace = this.departureCity;
    //   this.hotParam.departurePlace = this.departureCity;
    // }
    // if (this.arriveCity) {
    //   this.allParam.destinations = this.arriveCity;
    //   this.saleParam.destinations = this.arriveCity;
    //   this.hotParam.destinations = this.arriveCity;
    // }

    this.segment = "sale";
  }
  private setSaleParam() {
    this.saleParam = {
      pageIndex: 1,
      pageSize: 10,
      sale: true,
      // keyWord: this.key ? this.key : ''
    };
    if (this.subType) {
      this.saleParam.subTypes = this.subType;
    }
    this.saleProduct = [];
    this.saleIsLoad = true;
  }
  private setAllParam() {
    this.allParam = {
      pageIndex: 1,
      pageSize: 10,
      // keyWord: this.key ? this.key : ''
    };
    if (this.subType) {
      this.allParam.subTypes = this.subType;

    }
    this.allProduct = [];
    this.allIsLoad = true;
  }
  private setHotParam() {
    this.hotParam = {
      pageIndex: 1,
      pageSize: 10,
      hot: true,
      // keyWord: this.key ? this.key : ''
    };
    if (this.subType) {
      this.hotParam.subTypes = this.subType;
    }
    this.hotProduct = [];
    this.hotIsLoad = true;
  }

  setOutCitySelect() {
    this.navCtrl.push(SetOutCityPage, { param: this.getPushParam() });
  }
  arriveAtCitySelect() {
    this.navCtrl.push(ArriveAtCityPage, { param: this.getPushParam() });
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
    this.productService.getLines(this.saleParam).then(response => {
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
    this.productService.getLines(this.allParam).then(response => {
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
    this.productService.getLines(this.hotParam).then(response => {
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
