import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaService } from '../../providers/areaService';
import { LineSearchResultPage } from '../line-search-result/line-search-result';

@IonicPage()
@Component({
  selector: 'page-arrive-at-city',
  templateUrl: 'arrive-at-city.html',
  providers: [AreaService]
})
export class ArriveAtCityPage {

  area: any = [];
  hotCity: any = [];
  tabvalue = 0;
  arriveCityHis: any = [];
  param: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private areaService: AreaService) {
    this.init();
  }

  private init() {
    this.param = this.navParams.get('param');
    // console.log(this.param);
    this.getHis();
    this.getHotCityList();
    this.getCityList();
  }

  private getHotCityList() {
    this.hotCity = JSON.parse(localStorage.getItem('hotCity')) || [];
    if (this.hotCity.length > 0) return;
    this.areaService.getHot().then(response => {
      if (response.Success) {
        this.hotCity = response.Result;
        localStorage.setItem('hotCity', JSON.stringify(this.hotCity));
      }
    }).catch();
  }

  private getCityList() {
    this.area = JSON.parse(localStorage.getItem('area')) || [];
    if (this.area.length > 0) {
      this.area.forEach(element => {
        this.areaService.get(element.Id).then(res => {
          if (res.Success) {
            element.Items = res.Result;
          }
        }).catch();
      });
    } else {
      this.areaService.get().then(response => {
        if (response.Success) {
          this.area = response.Result;
          // console.log(this.area);
          if (this.area) {
            this.area.forEach(element => {
              this.areaService.get(element.Id).then(res => {
                if (res.Success) {
                  element.Items = res.Result;
                }
              }).catch();
            });
          }
          localStorage.setItem('area', JSON.stringify(this.area));
        }
      }).catch();
    }
  }

  selectCity(city: string) {
    if (!city) return;
    this.addHis(city);
    this.param.arrive = city;
    this.param.key = city;
    this.navCtrl.push(LineSearchResultPage, { param: this.param });
    // if (this.param.source == 'result') {
    //   this.navCtrl.push(LineSearchResultPage, { param: this.param });
    // } else if (this.param.source == 'index') {
    //   this.navCtrl.push(LineIndexPage, { param: this.param });
    // }
  }

  private getHis() {
    this.arriveCityHis = JSON.parse(localStorage.getItem('arriveCityHis')) || [];
  }

  private addHis(city: string) {
    if (city) {
      this.arriveCityHis = [city].concat(this.arriveCityHis);
      if (this.arriveCityHis.length > 5) this.arriveCityHis.splice(5, (this.arriveCityHis.length - 5));
      localStorage.setItem('arriveCityHis', JSON.stringify(this.arriveCityHis));
    }
  }

  clearHistory() {
    this.arriveCityHis = [];
    localStorage.setItem('arriveCityHis', JSON.stringify([]));
  }

  keySelect(e) {
    if (!e) return;
    if (e.keyCode == 13) {//&& this.param.key
      if (this.param.key)
        this.addHis(this.param.key);
      this.navCtrl.push(LineSearchResultPage, { param: this.param });
      // if (this.param.source == 'result') {
      //   this.navCtrl.push(LineSearchResultPage, { param: this.param });
      // } else if (this.param.source == 'index') {
      //   this.navCtrl.push(LineIndexPage, { param: this.param });
      // }
    }
  }

}
