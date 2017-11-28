import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { SupplierStorePage } from '../supplier-store/supplier-store';
import { SupplierService } from '../../providers/supplierService';
import { Default_Supplier_Img } from '../../providers/constants';
import { BasePage } from '../../providers/basePage';
import { UesChatPage } from '../ues-chat/ues-chat';
import { LoadCtrl } from '../../providers/loadingController';
import { ToastCtrl } from '../../providers/toastController';
// import { QqChatPage } from '../qq-chat/qq-chat';

@IonicPage()
@Component({
  selector: 'page-supplier',
  templateUrl: 'supplier.html',
  providers: [SupplierService, LoadCtrl]
})
export class SupplierPage extends BasePage {

  supplierList: any = [];
  sType: any = [];
  isLoad: boolean = true;
  SortModel: string = '我的供应商';
  isSort: boolean = false;
  isScreen: boolean = false;
  param: any = {};
  businessType: string;
  priceType: number = 0;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private app: App,
    private supplierService: SupplierService,
    private loading: LoadCtrl,
    private toastCtrl: ToastCtrl) {
    super();
    this.init();
  }

  private init() {

    this.supplierService.getTypes().then(response => {
      if (response.Success) {
        this.sType = response.Result.Root.ChildrenDicEntities;
      }
    }).catch(err => console.log(err));

    let key = this.navParams.get('key');
    if (key) this.param.keyWord = key;
    this.submitSearch();
  }

  private resetParam() {
    let relationState = this.param.relationState;
    let key = this.param.keyWord;

    this.param = {
      // location: '',
      // bizTypes: '',
      // keyWord: '',
      pageIndex: 1,
      pageSize: 10,
      // relationState: this.param.relationState ? this.param.relationState : '1'
    };

    if (key) this.param.keyWord = key;
    this.param.relationState = relationState ? relationState : '1';

    if (this.priceType && this.businessType) {
      this.param.bizTypes = this.businessType;
    }

    this.supplierList = [];
    this.isLoad = true;

    this.isScreen = false;
    this.isSort = false;
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {
      this.submitSearch();
    }
  }

  isSortToggle() {
    this.isScreen = false;
    this.isSort = !this.isSort;
    console.log(this.isScreen); console.log(this.isSort);
  }
  isScreenToggle() {
    this.isSort = false;
    this.isScreen = !this.isScreen;
  }
  closeScreeningItem() {
    this.isScreen = false;
    this.isSort = false;
  }

  submitSearch() {
    this.resetParam();
    this.getSuppliers('', true);
  }

  doInfinite(infiniteScroll) {
    this.getSuppliers(infiniteScroll, '');
  }

  getSuppliers(infiniteScroll: any, isShowLoading: any) {
    if (isShowLoading) this.loading.show();
    this.supplierService.getSuppliers(this.param)
      .then(response => {
        if (response.Success) {
          let pList = response.Result.Items;
          this.param.pageIndex++;
          if (pList.length < this.param.pageSize) {
            this.isLoad = false;
          } else { this.isLoad = true; }
          this.setSupplierDefaultImg(pList);
          this.supplierList = this.supplierList.concat(pList);
        }
        if (infiniteScroll) infiniteScroll.complete();
        if (isShowLoading) this.loading.hide();
      }).catch();
  }

  private setSupplierDefaultImg(slist: any) {
    if (!slist) return;
    slist.forEach(element => {
      if (!element.ImgUri) element.ImgUri = Default_Supplier_Img;
    });
  }

  goSupplyStore(supplierId: number, relationState: number) {
    if (supplierId && relationState == 1)
      this.app.getRootNav().push(SupplierStorePage, { supplierId: supplierId });
  }

  sortChange() {
    if (this.SortModel == '我的供应商' && this.param.relationState == '1') return;
    if (this.SortModel == '全部供应商' && this.param.relationState == '3') return;
    this.isSort = false;
    if (this.param.relationState == '1') {
      this.SortModel = '我的供应商';
      this.submitSearch();
    } else if (this.param.relationState == '3') {
      this.SortModel = '全部供应商';
      this.submitSearch();
    }
  }

  selectedBusinessType(type: string) {
    if (!type) return;
    this.businessType = type;
    console.log(this.businessType);
  }

  resetBusinessType() {
    this.priceType = 0;
    this.businessType = '不限';
  }

  toBuildRelationship(supplierId: number) {
    if (!supplierId) return;
    this.loading.show();
    this.supplierService.invite(supplierId).then(response => {
      this.loading.hide();
      this.toastCtrl.show('邀请已发送');
      this.supplierList.forEach(element => {
        if (element.SupplierId == supplierId) {
          element.RelationState = 0;
        }
      });
    }).catch(err => console.log(err));
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

