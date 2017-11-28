import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { VisitorPage } from '../visitor/visitor';

@IonicPage()
@Component({
  selector: 'page-visitor-order',
  templateUrl: 'visitor-order.html'
})
export class VisitorOrderPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.init();
  }

  input: any = { OrderVisitorListInput: [] };

  private init() {
    this.input = this.navParams.get('input') || {};
  }

  getVisitor() {
    this.navCtrl.push(VisitorPage, { input: this.input });
  }

}
