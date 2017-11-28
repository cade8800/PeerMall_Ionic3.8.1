import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProductService } from '../../providers/productService';
import { SingleDetailPage } from '../single-detail/single-detail';
import { SingleSearchResultPage } from '../single-search-result/single-search-result';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';


@IonicPage()
@Component({
  selector: 'page-single-index',
  templateUrl: 'single-index.html',
  providers: [ProductService, LoadCtrl]
})
export class SingleIndexPage {

  segment = "all";
  key: string = '';

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
    this.init();
  }

  private init() {
    this.setSearchKey();
    this.getAllProduct('', true);
  }

  private setSearchKey() {
    this.allParam = {
      pageIndex: 1,
      pageSize: 10
    };
    this.saleParam = {
      pageIndex: 1,
      pageSize: 10,
      sale: true
    };
    this.hotParam = {
      pageIndex: 1,
      pageSize: 10,
      hot: true
    };

    this.segment = "all";

    this.allProduct = [];
    this.allIsLoad = true;
    this.saleProduct = [];
    this.saleIsLoad = true;
    this.hotProduct = [];
    this.hotIsLoad = true;
  }

  goProductDetail(productId: string) {
    this.navCtrl.push(SingleDetailPage, { Id: productId });
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {
      // this.setSearchKey();
      // let loader = this.loadCtrl.create();
      // this.getSaleProduct('', loader);
      this.navCtrl.push(SingleSearchResultPage, { key: this.key });
    }
  }

  allProductClick() {
    if (this.allProduct.length < 1) {
      this.getAllProduct('', true);
    }
  }
  hotProductClick() {
    if (this.hotProduct.length < 1) {
      this.getHotProduct('', true);
    }
  }

  private getSaleProduct(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getSingles(this.saleParam).then(response => {
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
    this.productService.getSingles(this.allParam).then(response => {
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
    this.productService.getSingles(this.hotParam).then(response => {
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
