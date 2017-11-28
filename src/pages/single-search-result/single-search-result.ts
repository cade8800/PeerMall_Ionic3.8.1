import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { SingleDetailPage } from '../single-detail/single-detail';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';


@IonicPage()
@Component({
  selector: 'page-single-search-result',
  templateUrl: 'single-search-result.html',
  providers: [ProductService, LoadCtrl]
})
export class SingleSearchResultPage {

  SortModel: string = '0';
  _SortModel: string = '0';
  sortModel: string = 'default';
  priceType = 0;
  isSort: boolean = false;
  isScreen: boolean = false;
  key: string = '';
  isLoad: boolean = true;
  param: any = {};
  productList: any = [];

  subTypes: any = [];
  selectedSubType: string = '';

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private productService: ProductService,
    private loading: LoadCtrl) {
    this.init();
  }

  private init() {
    this.key = this.navParams.get("key");
    this.productService.getSingleSubTypes().then(response => {
      if (response.Success) {
        this.subTypes = response.Result.SubTypes;
      }
    }).catch(err => console.log(err));
    this.submitSearch();
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
    if (this.selectedSubType) {
      this.param.subTypes = this.selectedSubType;
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
      this.priceType = 0;
      this.selectedSubType = '';
    }
  }


  private getProductList(infiniteScroll: any, isShowShare: boolean) {
    if (isShowShare) this.loading.show();
    this.productService.getSingles(this.param)
      .then(response => {
        if (response.Success) {
          let pList = response.Result.Items;
          pList = this.setDefaultProductListImg(pList);
          this.param.pageIndex++;
          if (pList.length < this.param.pageSize) {
            this.isLoad = false;
          } else { this.isLoad = true; }
          this.productList = this.productList.concat(pList);
          if (isShowShare) this.loading.hide();
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

  goProductDetail(productId: string) {
    if (productId)
      this.navCtrl.push(SingleDetailPage, { Id: productId });
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

  sortChange() {
    if (this.SortModel && this._SortModel != this.SortModel) {
      this._SortModel = this.SortModel;
      this.submitSearch();
    }
  }

}
