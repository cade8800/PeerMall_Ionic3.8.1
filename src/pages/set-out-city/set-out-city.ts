import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AreaService } from '../../providers/areaService';
import { LineSearchResultPage } from '../line-search-result/line-search-result';
import { HotelIndexPage } from '../hotel-index/hotel-index';

@IonicPage()
@Component({
  selector: 'page-set-out-city',
  templateUrl: 'set-out-city.html',
  providers: [AreaService]
})
export class SetOutCityPage {

  area: any = [];
  hotCity: any = [];
  tabvalue = 0;
  setOutCityHis: any = [];
  param: any = {};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private areaService: AreaService) {
    this.init();
  }


  private init() {
    this.param = this.navParams.get('param');
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
          console.log(this.area);
          if (this.area) {
            this.area.forEach(element => {
              this.areaService.get(element.Id).then(res => {
                if (res.Success) {
                  element.Items = res.Result;
                }
              }).catch();
            });
            localStorage.setItem('area', JSON.stringify(this.area));
          }
        }
      }).catch();
    }
  }

  selectCity(city: string) {
    if (!city) return;
    this.addHis(city);
    if (this.param.source == 'result' || this.param.source == 'index') {
      this.param.setOut = city;
      this.navCtrl.push(LineSearchResultPage, { param: this.param });
    } else if (this.param.source == 'hotel') {
      this.param.destinations = city;
      this.navCtrl.push(HotelIndexPage, { param: this.param });
    }
  }

  private getHis() {
    this.setOutCityHis = JSON.parse(localStorage.getItem('setOutCityHis')) || [];
  }

  private addHis(city: string) {
    if (city) {
      this.setOutCityHis = [city].concat(this.setOutCityHis);
      if (this.setOutCityHis.length > 5) this.setOutCityHis.splice(5, (this.setOutCityHis.length - 5));
      localStorage.setItem('setOutCityHis', JSON.stringify(this.setOutCityHis));
    }
  }

  clearHistory() {
    this.setOutCityHis = [];
    localStorage.setItem('setOutCityHis', JSON.stringify([]));
  }

}
