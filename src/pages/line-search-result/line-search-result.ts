import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SetOutCityPage } from '../set-out-city/set-out-city';
import { ArriveAtCityPage } from '../arrive-at-city/arrive-at-city';
import { LineDetailPage } from '../line-detail/line-detail';
import { ProductService } from '../../providers/productService';
import { Default_Product_Img } from '../../providers/constants';
import { BasePage } from '../../providers/basePage';
import { LoadCtrl } from '../../providers/loadingController';


@IonicPage()
@Component({
  selector: 'page-line-search-result',
  templateUrl: 'line-search-result.html',
  providers: [ProductService, LoadCtrl]
})
export class LineSearchResultPage extends BasePage {

  themes: any = [];
  productList: any = [];

  isSort: boolean = false;
  isScreen: boolean = false;

  isLoad: boolean = true;

  param: any = {};
  departureCity: string = '广州';
  arriveCity: string = '';
  key: string = '';
  themeName: string = '';
  travelDay: string = '0';
  SortModel: string = '0';

  _SortModel: string = '0';
  theme: string = '0';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private loading: LoadCtrl,
    private productService: ProductService) {
    super();
    this.init();
  }

  private init() {
    this.key = this.navParams.get("key");
    let pushParam = this.navParams.get('param');
    if (pushParam) this.setPushParam(pushParam);
    else {
      let that = this;
      this.getLocalCity(function (city: string) {
        that.departureCity = city;
      });
    }
    this.getThemes();
    this.submitSearch();
  }

  private getPushParam(): any {
    return {
      key: this.key,
      setOut: this.departureCity,
      arrive: this.arriveCity,
      sort: this.SortModel,
      _sort: this._SortModel,
      day: this.travelDay,
      theme: this.themeName,
      _theme: this.theme,
      source: 'result'
    };
  }
  private setPushParam(param: any) {
    this.key = param.key;
    this.departureCity = param.setOut;
    this.arriveCity = param.arrive;
    this.SortModel = param.sort;
    this._SortModel = param._sort;
    this.travelDay = param.day;
    this.themeName = param.theme;
    this.theme = param._theme;
  }

  private getThemes() {
    this.themes = JSON.parse(localStorage.getItem('lineThemes')) || [];
    if (this.themes.length > 0) return;
    this.productService.getThemes().then(response => {
      if (response.Success) {
        this.themes = response.Result.ChildrenDicEntities;
        console.log(this.themes);
        localStorage.setItem('lineThemes', JSON.stringify(this.themes));
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
  setOutCity() {
    this.navCtrl.push(SetOutCityPage, { param: this.getPushParam() });
  }
  arriveAtCity() {
    this.navCtrl.push(ArriveAtCityPage, { param: this.getPushParam() });
  }
  doInfinite(infiniteScroll) {
    this.getProductList(infiniteScroll, false);
  }

  resetParam(noHideBlock?: boolean) {
    this.param = {
      pageIndex: 1,
      pageSize: 10,
      keyWord: this.key ? this.key : ''
    };
    if (this.SortModel && this.SortModel != '0') {
      this.param.orderByType = this.SortModel;
    }
    if (this.travelDay && this.travelDay != '0')
      this.param.travelDays = this.travelDay;
    if (this.themeName)
      this.param.themes = this.themeName;
    if (this.departureCity)
      this.param.departurePlace = this.departureCity;
    if (this.arriveCity)
      this.param.destinations = this.arriveCity;
    if (!noHideBlock) {
      this.productList = [];
      this.isLoad = true;
      this.isScreen = false;
      this.isSort = false;
    } else {
      this.theme = '0';
      this.themeName = '';
      this.travelDay = '0';
    }
  }

  private getProductList(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getLines(this.param)
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

  goLineDetail(productId: string) {
    if (productId)
      this.navCtrl.push(LineDetailPage, { Id: productId });
  }

  submitSearch() {
    this.resetParam();
    this.getProductList('', true);
  }

  sortChange() {
    if (this.SortModel && this._SortModel != this.SortModel) {
      this._SortModel = this.SortModel;
      this.submitSearch();
    }
  }

  setThemes(name: string) {
    this.themeName = name ? name : '';
  }


}
