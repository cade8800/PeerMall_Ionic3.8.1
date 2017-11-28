import { Injectable } from '@angular/core';

@Injectable()
export class DateTimeHelper {

    /**
     * 判断当前日期是否在指定日期内
     * @param currentDate 
     * @param startDate 
     * @param endDate 
     */
    public isDateInSpecifiedPeriod(currentDate, startDate, endDate): boolean {
        var cDate = (new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate())).getTime();
        var sDate = (new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())).getTime();
        var eDate = (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())).getTime();

        if (sDate == eDate) {
            if (cDate == eDate) {
                return true;
            } else return false;
        } else {
            if (cDate >= sDate && cDate < eDate) {
                return true;
            } else return false;
        }

    }

    /**
     * 获取间隔天数
     * @param startDate 
     * @param endDate 
     */
    public getDateDiff(startDate, endDate): number {
        var startTime = (new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate())).getTime();
        var endTime = (new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate())).getTime();
        var dates = Math.abs(startTime - endTime) / (1000 * 60 * 60 * 24);
        return dates;
    }

    /**
     * 获取指定日期的前x天或后x天的日期对象
     * @param currenDate 
     * @param AddDayCount 
     */
    public addDay(currenDate, AddDayCount) {
        var dd = new Date(currenDate);
        dd.setDate(dd.getDate() + AddDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear();
        var m = dd.getMonth();//获取当前月份的日期
        var d = dd.getDate();
        //return y+"-"+m+"-"+d;
        return new Date(y, m, d);
    }

    /**
     * 判断两个日期是否是同一天
     * @param date1 
     * @param date2 
     */
    public isSameDay(date1, date2): boolean {
        let _date1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
        let _date2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return _date1.getTime() === _date2.getTime();
    }

}

export class UrlHelper {

    /**
     * 获取程序运行环境
     */
    public static appEnvironment(): AppEnvironment {
        let currentUrl = window.location.href;
        if (currentUrl.indexOf("umall.inner.com") > -1) {
            return AppEnvironment.Debug;
        } else if (currentUrl.indexOf("umall-cs.360uut.com") > -1) {
            return AppEnvironment.Sat;
        } else if (currentUrl.indexOf("umall.360uut.com") > -1) {
            return AppEnvironment.Release;
        }
    }

    /**
     * 获取api Host
     */
    public static apiHost(): string {
        let host = 'http://umall.inner.com';
        if (this.appEnvironment() == AppEnvironment.Debug) {
            host = 'http://umall.inner.com';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            host = 'http://umall-cs.360uut.com';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            host = 'http://umall.360uut.com';
        }
        return host;
    }

    /**
     * 获取登录url
     */
    public static loginUrl() {
        let currentUrl = window.location.href;
        let loginUrl = '';
        if (this.appEnvironment() == AppEnvironment.Debug) {
            loginUrl = "http://inner.com/Account/Login?ReturnUrl=" + currentUrl;
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            loginUrl = "http://m.uip-cs.360uut.com/Home/Login?ReturnUrl=" + currentUrl;
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            loginUrl = "http://mvip.360uut.com/home/Login?ReturnUrl=" + currentUrl;
        }
        return loginUrl;
    }

    /**
     * 优聚url
     */
    public static homeUrl() {
        if (this.appEnvironment() == AppEnvironment.Debug) {
            return 'http://inner.com';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            return 'http://m.uip-cs.360uut.com';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            return 'http://mvip.360uut.com';
        }
    }

    /**
     * 收客优url
     */
    public static ushareUrl() {
        if (this.appEnvironment() == AppEnvironment.Debug) {
            return 'http://usale.Inner.com';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            return 'http://usale-cs.360uut.com';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            return 'http://usale.360uut.com';
        }
    }


    /**
     * 优信url
     */
    public static uesUrl() {
        if (this.appEnvironment() == AppEnvironment.Debug) {
            return 'http://uesm.inner.com/';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            return 'http://uesm-cs.360uut.com/';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            return 'http://uesm.360uut.com/';
        }
    }


    /**
     * 零售商城
     */
    public static retailMallUrl() {
        if (this.appEnvironment() == AppEnvironment.Debug) {
            return 'http://r.umall.inner.com';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            return 'http://r.umall-cs.360uut.com';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            return 'http://r.umall.360uut.com';
        }
    }

    /**
     * 优享
     */
    public static shareUrl() {
        if (this.appEnvironment() == AppEnvironment.Debug) {
            return 'http://share.inner.com/';
        } else if (this.appEnvironment() == AppEnvironment.Sat) {
            return 'http://share-cs.360uut.com/';
        } else if (this.appEnvironment() == AppEnvironment.Release) {
            return 'http://share.360uut.com/';
        }
    }

}

export class StringHelper {
    public static trim(val: string) {
        return val.replace(/(^\s*)|(\s*$)/g, "");
    }
    public static ltrim(val: string) {
        return val.replace(/(^\s*)/g, "");
    }
    public static rtrim(val: string) {
        return val.replace(/(\s*$)/g, "");
    }
}

export enum AppEnvironment {
    Debug,
    Sat,
    Release
}

