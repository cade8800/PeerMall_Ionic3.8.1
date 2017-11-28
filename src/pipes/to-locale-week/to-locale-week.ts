import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toLocaleWeekPipe',
})

export class ToLocaleWeekPipe implements PipeTransform {
  transform(value: string, ...args) {
    let weekList = {
      "Sunday": "周日",
      "Monday": "周一",
      "Tuesday": "周二",
      "Wednesday": "周三",
      "Thursday": "周四",
      "Friday": "周五",
      "Saturday": "周六"
    };
    return weekList[value] ? weekList[value] : '';
  }
}
