import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitorService } from '../../providers/visitorService';
import { VisitorPage } from '../visitor/visitor';
import { StringHelper } from '../../providers/utils';
import { LoadCtrl } from '../../providers/loadingController';
import { ToastCtrl } from '../../providers/toastController';


@IonicPage()
@Component({
  selector: 'page-visitor-edit',
  templateUrl: 'visitor-edit.html',
  providers: [VisitorService, LoadCtrl]
})
export class VisitorEditPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private visitorService: VisitorService,
    private loading: LoadCtrl,
    private toastCtrl: ToastCtrl) {
    this.init();
  }

  title: string = '';
  input: any = {};
  visitor: any = {
    VisitorEmail: '',
    VisitorGender: 1,
    // VisitorIdCard: '',
    VisitorName: '',
    // VisitorPassport: '',
    VisitorPhone: '',
    VisitorType: 2,
    CredentialType: 1,
    CredentialNumber: '',
    InputSource: 1
  };

  private init() {
    this.input = this.navParams.get('input');
    let vis = this.navParams.get('visitor');
    if (vis) {
      this.visitor = vis;
      this.title = "编辑";
    } else {
      this.title = "新增";
    }
  }

  complete() {

    if (!StringHelper.trim(this.visitor.VisitorName)) {
      this.toastCtrl.show("游客名称不可为空");
      return;
    }
    if (!this.visitor.VisitorType) {
      this.toastCtrl.show("请选择游客类型");
      return;
    }
    if (!this.visitor.CredentialType) {
      this.toastCtrl.show("请选择证件类型");
      return;
    }
    if (!StringHelper.trim(this.visitor.CredentialNumber)) {
      this.toastCtrl.show("证件号码不可为空");
      return;
    }

    if (this.title == '编辑') {
      this.loading.show();
      this.visitorService.update(this.visitor).then(response => {
        if (response.Success) {
          this.loading.hide();
          this.navCtrl.push(VisitorPage, { input: this.input });
        }
      }).catch(err => {
        console.log(err);
        this.toastCtrl.show('请完善游客信息');
        this.loading.hide();
      });
    } else if (this.title == '新增') {
      this.loading.show();
      this.visitorService.add(this.visitor).then(response => {
        if (response.Success) {
          this.loading.hide();
          this.navCtrl.push(VisitorPage, { input: this.input });
        }
      }).catch(err => {
        console.log(err);
        this.toastCtrl.show('请完善游客信息');
        this.loading.hide();
      });
    }


  }

}
