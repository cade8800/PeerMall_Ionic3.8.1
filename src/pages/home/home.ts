import { Component } from '@angular/core';
import { NavController, App, ActionSheetController } from 'ionic-angular';
import { SearchIndexPage } from '../search-index/search-index';
import { TicketIndexPage } from '../ticket-index/ticket-index';
import { HotelIndexPage } from '../hotel-index/hotel-index';
import { LineDetailPage } from '../line-detail/line-detail';
import { LineIndexPage } from '../line-index/line-index';
import { ProductService } from '../../providers/productService';
import { HotelDetailPage } from '../hotel-detail/hotel-detail';
import { TicketDetailPage } from '../ticket-detail/ticket-detail';
import { SingleIndexPage } from '../single-index/single-index';
import { BasePage } from '../../providers/basePage';
import { SingleDetailPage } from '../single-detail/single-detail';
import { Default_Product_Img } from '../../providers/constants';
import { LoadCtrl } from '../../providers/loadingController';
import { AccountService } from '../../providers/accountService';
import { SupplierStorePage } from '../supplier-store/supplier-store';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [ProductService, LoadCtrl, AccountService]
})
export class HomePage extends BasePage {

  pet = "kittens";
  localCityName: string = '广州';
  productList: any = [];
  PageIndex: number = 1;
  PageSize: number = 10;
  isLoad: boolean = true;

  constructor(public navCtrl: NavController,
    private app: App,
    private productService: ProductService,
    private loading: LoadCtrl,
    private actionSheetCtrl: ActionSheetController,
    private accountService: AccountService) {
    super();
    this.init();
  }

  private init() {

    let that = this;
    this.getLocalCity(function (city: string) {
      that.localCityName = city;
    })

    let pid = this.getUrlParam('pid');
    let ptype = this.getUrlParam('ptype');
    if (pid && ptype) {
      this.getIsSaleProductList('', false);
      this.goProductDetail(ptype, pid);
    } else {
      this.getIsSaleProductList('', true);
    }

    this.getUserInfo();
  }

  goProductDetail(type: string, id: string) {
    if (!id) return;
    if (type == '线路' || type == 'line') {
      this.app.getRootNav().push(LineDetailPage, { Id: id });
    } else if (type == '酒店' || type == 'hotel') {
      this.app.getRootNav().push(HotelDetailPage, { Id: id });
    } else if (type == '门票' || type == 'ticket') {
      this.app.getRootNav().push(TicketDetailPage, { Id: id });
    } else if (type == '单项' || type == 'single') {
      this.app.getRootNav().push(SingleDetailPage, { Id: id });
    }
  }

  doInfinite(infiniteScroll) {
    this.getIsSaleProductList(infiniteScroll, false);
  }

  private getUserInfo() {
    this.accountService.getInfo().then(response => {
      if (response.Success) {
        AccountService.CurrentUserInfo = response.Result;
      }
    }).catch();
  }

  private getIsSaleProductList(infiniteScroll: any, isShowLoading: boolean) {
    if (isShowLoading) this.loading.show();
    this.productService.getProducts({ pageIndex: this.PageIndex, pageSize: this.PageSize, sale: true })//
      .then(response => {
        if (response.Success) {
          let pList = response.Result.Items;
          pList = this.setDefaultProductListImg(pList);
          this.PageIndex++;
          if (pList.length < this.PageSize) {
            this.isLoad = false;
          } else { this.isLoad = true; }
          this.productList = this.productList.concat(pList);
          this.loading.hide();
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

  goIndexSearch() {
    this.app.getRootNav().push(SearchIndexPage);
  }

  goTicketindex() {
    this.app.getRootNav().push(TicketIndexPage);
  }

  goHotelindex() {
    this.app.getRootNav().push(HotelIndexPage);
  }

  goLineindex(subType: string) {
    this.app.getRootNav().push(LineIndexPage, { subType: subType });
  }

  goSingle() {
    this.app.getRootNav().push(SingleIndexPage);
  }

  public myShop() {
    let actionSheet = this.actionSheetCtrl.create({
      // title: '前往我的商城',
      buttons: [
        {
          text: '我的商城',
          role: 'destructive',
          handler: () => {
            if (AccountService.CurrentUserInfo.AgencyId)
              this.app.getRootNav().push(SupplierStorePage, { supplierId: AccountService.CurrentUserInfo.AgencyId });
          }
        },
        {
          text: '取消',
          role: 'cancel',
          handler: () => { }
        }
      ]
    });

    actionSheet.present();
  }

}
