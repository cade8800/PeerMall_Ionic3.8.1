import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitorEditPage } from "../visitor-edit/visitor-edit";
import { VisitorService } from '../../providers/visitorService';
import { OrderPage } from '../order/order';
import { LoadCtrl } from '../../providers/loadingController';

@IonicPage()
@Component({
  selector: 'page-visitor',
  templateUrl: 'visitor.html',
  providers: [VisitorService, LoadCtrl]
})
export class VisitorPage {

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private visitorService: VisitorService,
    private loading: LoadCtrl) {
    this.init();
  }

  input: any = {};
  visitorList: any = [];

  private init() {
    this.input = this.navParams.get('input');
    if (!this.input) return;
    this.loading.show();
    this.visitorService.get().then(response => {
      if (response.Success) {
        this.visitorList = response.Result;
        this.visitorList.forEach(element => {
          element.state = this.setVisitorSelected(element.Id) ? true : false;
        });
        this.loading.hide();
      }
    }).catch(err => console.log(err));
  }

  private setVisitorSelected(visId: string): boolean {
    let list = this.input.OrderVisitorListInput.filter(function (vis) {
      return vis.Id == visId;
    });
    return list.length > 0;
  }

  visitorSelected() {
    let selectedVisitorList = this.visitorList.filter(function (vis) {
      return vis.state == true;
    });
    this.input.OrderVisitorListInput = selectedVisitorList;
    this.navCtrl.push(OrderPage, { input: this.input })
  }

  addVisitor() {
    this.navCtrl.push(VisitorEditPage, { input: this.input });
  }

  editVisitor(visitor: any) {
    if (visitor)
      this.navCtrl.push(VisitorEditPage, { input: this.input, visitor: visitor });
  }

}
