import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trafficToolsPipe',
})
export class TrafficToolsPipe implements PipeTransform {
  transform(value: string, ...args) {
    if (value) {
      let tools = {
        '汽车': 'assets/restype/blue-car.png',
        '飞机': 'assets/restype/blue-plane.png',
        '火车': 'assets/restype/blue-train.png',
        '轮船': 'assets/restype/blue-ship.png',
        '步行': 'assets/restype/blue-walk.png',
        '集合': 'assets/restype/blue-jihe.png',
        '用车': 'assets/restype/blue-qiche.png',
        '住宿': 'assets/restype/blue-zhusu.png',
        '景点': 'assets/restype/blue-jindian.png',
        '餐饮': 'assets/restype/blue-canying.png',
        '购物': 'assets/restype/blue-gouwu.png',
        '文娱': 'assets/restype/blue-wenyu.png',
        '自由活动': 'assets/restype/blue-walk.png',
        '线路': 'assets/restype/blue-xianlu.png',
        '附加项': 'assets/restype/blue-fujiaxiang.png',
        '其它': 'assets/restype/blue-qita.png'
      };
      value = tools[value];
    }
    return value ? value : 'assets/restype/blue-qita.png';
  }
}
