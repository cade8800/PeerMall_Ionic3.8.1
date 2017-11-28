import { Component, Input, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'count-down',
  templateUrl: 'count-down.html'
})
export class CountDownComponent implements AfterViewInit, OnDestroy {
  /**
   * 销毁组件时清除定时器
   */
  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }
  /**
   * 按秒倒计
   */
  ngAfterViewInit(): void {
    this.timer = setInterval(() => {
      this.getSpecificTime();
      this.mseconds -= 1000;
    }, 1000);
  }

  @Input() mseconds: number;

  /**
   * 定时器
   */
  private timer;

  private day: number = 0;
  private hour: number = 0;
  /**
   * 分
   */
  private minute: number = 0;
  /**
   * 秒
   */
  private second: number = 0;


  private dayOverride: number = 1000 * 60 * 60 * 24;
  private hourOverride: number = 1000 * 60 * 60;
  private minuteOverride: number = 1000 * 60;
  private secondOverride: number = 1000;

  constructor() { }

  private getSpecificTime() {
    if (!this.mseconds || this.mseconds <= 0) {
      this.hour = 0;
      this.minute = 0;
      this.second = 0;
      return;
    }

    this.day = parseInt((this.mseconds / this.dayOverride).toString());
    this.hour = parseInt(((this.mseconds - this.day * this.dayOverride) / this.hourOverride).toString());
    this.minute = parseInt(((this.mseconds - this.day * this.dayOverride - this.hour * this.hourOverride) / this.minuteOverride).toString());
    this.second = parseInt(((this.mseconds - this.day * this.dayOverride - this.hour * this.hourOverride - this.minute * this.minuteOverride) / this.secondOverride).toString());

  }

}
