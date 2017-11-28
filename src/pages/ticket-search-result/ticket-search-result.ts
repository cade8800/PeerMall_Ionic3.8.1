import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';


@IonicPage()
@Component({
  selector: 'page-ticket-search-result',
  templateUrl: 'ticket-search-result.html',
  providers: [ProductService, LoadCtrl]
})
export class TicketSearchResultPage {

  SortModel: string = '0';
  _SortModel: string = '0';
  sortModel: string = 'default';
  priceType = 1;
  isSort: boolean = false;
  isScreen: boolean = false;
  key: string = '';
  isLoad: boolean = true;
  param: any = {};
  productList: any = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl) {
    this.init();
  }

  private init() {
    this.key = this.navParams.get("key");
    this.resetParam();
    this.getProductList('', true);
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

  doInfinite(infiniteScroll) {
    this.getProductList(infiniteScroll, false);
  }

  private resetParam(noHideBlock?: boolean) {
    this.param = {
      pageIndex: 1,
      pageSize: 10,
      keyWord: this.key ? this.key : ''
    };
    switch (this.priceType) {
      case 2: this.setPrice(0, 50); break;
      case 3: this.setPrice(50, 100); break;
      case 4: this.setPrice(100, 200); break;
      case 5: this.setPrice(200, 300); break;
      case 6: this.setPrice(300, 500); break;
      case 7: this.setPrice(500, 0); break;
    };
    if (this.SortModel && this.SortModel != '0') {
      this.param.orderByType = this.SortModel;
    }
    if (!noHideBlock) {
      this.productList = [];
      this.isLoad = true;
      this.isScreen = false;
      this.isSort = false;
    } else {
      this.priceType = 1;
    }
  }


  private getProductList(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getTickets(this.param)
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

  goTicketDetail(productId: string) {
    if (productId)
      this.navCtrl.push(TicketDetailPage, { Id: productId });
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {
      this.submitSearch();
    }
  }

  submitSearch() {
    this.resetParam();
    this.getProductList('', true);
  }

  private setPrice(min: number, max: number) {
    if (min)
      this.param.priceStart = min;
    if (max)
      this.param.priceEnd = max;
  }

  sortChange() {
    if (this.SortModel && this._SortModel != this.SortModel) {
      this._SortModel = this.SortModel;
      this.submitSearch();
    }
  }

}
