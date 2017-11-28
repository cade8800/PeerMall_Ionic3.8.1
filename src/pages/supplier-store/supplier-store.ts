import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SupplierInfoPage } from "../supplier-info/supplier-info";
import { HotelDetailPage } from "../hotel-detail/hotel-detail";
import { LineDetailPage } from "../line-detail/line-detail";
import { TicketDetailPage } from "../ticket-detail/ticket-detail";
import { SupplierService } from "../../providers/supplierService";
import { ProductService } from "../../providers/productService";
import { Default_Supplier_Img } from '../../providers/constants';
import { UesChatPage } from '../ues-chat/ues-chat';
import { SingleDetailPage } from '../single-detail/single-detail';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';
// import { QqChatPage } from '../qq-chat/qq-chat';


@IonicPage()
@Component({
  selector: 'page-supplier-store',
  templateUrl: 'supplier-store.html',
  providers: [SupplierService, ProductService, LoadCtrl]
})
export class SupplierStorePage {

  segment = "sale";
  info: any = {};
  contact: any = {};

  supplierId: number;

  key: string = '';

  allProduct: any = [];
  allIsLoad: boolean = true;
  saleProduct: any = [];
  saleIsLoad: boolean = true;
  hotProduct: any = [];
  hotIsLoad: any = true;

  allParam: any = {
    pageIndex: 1,
    pageSize: 10,
    keyWord: this.key ? this.key : ''
  };
  saleParam: any = {
    pageIndex: 1,
    pageSize: 10,
    sale: true,
    keyWord: this.key ? this.key : ''
  };
  hotParam: any = {
    pageIndex: 1,
    pageSize: 10,
    hot: true,
    keyWord: this.key ? this.key : ''
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public supplierService: SupplierService,
    public productService: ProductService,
    private loading: LoadCtrl) {
    this.init();
  }

  private init() {
    this.supplierId = this.navParams.get('supplierId');
    if (!this.supplierId) return;
    this.loading.show();
    this.supplierService.getInfo(this.supplierId).then(response => {
      this.loading.hide();
      if (response.Success) {
        this.info = response.Result.SupplierDetail;
        this.contact = response.Result.Contact;
        this.setDefaultSupplierImg();
        this.setSearchKey();
        this.getSaleProduct('', false);
      }
    }).catch();
  }

  private setDefaultSupplierImg() {
    if (!this.info.AgencyImg) {
      this.info.AgencyImg = Default_Supplier_Img;
    }
  }

  goSupplierInfo() {
    this.navCtrl.push(SupplierInfoPage, { contact: this.contact, info: this.info });
  }

  goProductDetail(type: string, id: string) {
    if (!id) return;
    if (type == '线路') {
      this.navCtrl.push(LineDetailPage, { Id: id });
    } else if (type == '酒店') {
      this.navCtrl.push(HotelDetailPage, { Id: id });
    } else if (type == '门票') {
      this.navCtrl.push(TicketDetailPage, { Id: id });
    } else if (type == '单项') {
      this.navCtrl.push(SingleDetailPage, { Id: id });
    }
  }

  private setSearchKey() {
    this.setAllParam();
    this.setSaleParam();
    this.setHotParam();
    this.segment = "sale";
  }

  private setSaleParam() {
    this.saleParam = {
      pageIndex: 1,
      pageSize: 10,
      sale: true,
      keyWord: this.key ? this.key : '',
      SupplierIds: this.supplierId
    };
    this.saleProduct = [];
    this.saleIsLoad = true;
  }

  private setAllParam() {
    this.allParam = {
      pageIndex: 1,
      pageSize: 10,
      keyWord: this.key ? this.key : '',
      SupplierIds: this.supplierId
    };
    this.allProduct = [];
    this.allIsLoad = true;
  }

  private setHotParam() {
    this.hotParam = {
      pageIndex: 1,
      pageSize: 10,
      hot: true,
      keyWord: this.key ? this.key : '',
      SupplierIds: this.supplierId
    };
    this.hotProduct = [];
    this.hotIsLoad = true;
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {
      this.setSearchKey();
      this.getSaleProduct('', true);
    }
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
    this.productService.getProducts(this.saleParam).then(response => {
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
    this.productService.getProducts(this.allParam).then(response => {
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
    this.productService.getProducts(this.hotParam).then(response => {
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

  uesChat(userId: number) {
    if (userId)
      this.navCtrl.push(UesChatPage, { userId: userId });
  }

  // qqChat(qq: number) {
  //   if (qq)
  //     this.navCtrl.push(QqChatPage, { qq: qq });
  // }

}
