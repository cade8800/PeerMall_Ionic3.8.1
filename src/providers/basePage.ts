import { UrlHelper } from './utils';
import { Defualt_Slide_Img } from './constants';
import { Injectable } from '@angular/core';
import { AccountService } from './accountService';
declare var AMap: any;
declare var shareModel: any;

@Injectable()
export class BasePage {

    isShowShareCpm: boolean = false;

    constructor() { }

    /**
     * 获取URL参数
     * @param name 参数名
     */
    public getUrlParam(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
        var r = window.location.search.substr(1).match(reg);  //匹配目标参数
        if (r != null) return r[2];
        return null; //返回参数值
    }

    /**
     * 获取优聚平台URL
     */
    public goUutHome() {
        let targerUrl = UrlHelper.homeUrl();
        if (targerUrl) window.location.href = targerUrl;
    }
    /**
     * 获取收客优URL
     */
    public goShouKeYu() {
        let targerUrl = UrlHelper.ushareUrl();
        if (targerUrl) window.location.href = targerUrl;
    }

    /**
     * 高德网络定位城市
     * @param callback 定位成功回调
     */
    public getLocalCity(callback: Function) {
        let map = new AMap.Map('');
        map.plugin('AMap.CitySearch', function () {
            let mapCity = new AMap.CitySearch();
            mapCity.getLocalCity(function (status, result) {
                if (status == 'complete' && result) {
                    callback(result.city.replace('市', ''));
                } else console.log(result);
            });
        });
    }

    /**
     * 产品详情-设置默认轮播图
     * @param info 
     */
    public setDefaultSlideImg(info: any = {}): any {
        if (info.Images.length < 1) {
            info.Images.push({ Path: Defualt_Slide_Img });
        }
        return info;
    }


    /**
     * 分享初始化
     * @param supplierId 
     * @param productId 
     * @param productName 
     * @param productType 
     * @param productImg 
     */
    public uutShareInit(supplierId: string, productId: string, productName: string, productType: string, productImg: string) {
        if (!AccountService.CurrentUserInfo.AgencyId) return;
        let config = {
            webLink: UrlHelper.retailMallUrl() + '?id=' + AccountService.CurrentUserInfo.AgencyId + '&ptype=' + productType + '&pid=' + productId,
            title: productName,
            content: '向您推荐的旅游产品',
            thumbnailUrl: UrlHelper.retailMallUrl() + productImg,
            shareType: 1
        };
        if (AccountService.CurrentUserInfo.AgencyId == supplierId) {
            config.webLink = window.location.host + '?ptype=' + productType + '&pid=' + productId;
        }
        shareModel.init(UrlHelper.shareUrl(), config);
    }

    /**
     * 分享零售商城
     * @param productId 
     * @param productName 
     * @param productType 
     * @param productImg 
     */
    public uutShareRetail(productId: string, productName: string, productType: string, productImg: string) {
        if (!AccountService.CurrentUserInfo.AgencyId) return;
        let config = {
            webLink: UrlHelper.retailMallUrl() + '?id=' + AccountService.CurrentUserInfo.AgencyId + '&ptype=' + productType + '&pid=' + productId,
            title: productName,
            content: '向您推荐的旅游产品',
            thumbnailUrl: UrlHelper.retailMallUrl() + productImg,
            shareType: 1
        };
        shareModel.init(UrlHelper.shareUrl(), config);
        shareModel.open();
    }

    /**
     * 分享同业商城
     * @param productId 
     * @param productName 
     * @param productType 
     * @param productImg 
     */
    public uutSharePeer(productId: string, productName: string, productType: string, productImg: string) {
        let config = {
            webLink: window.location.host + '?ptype=' + productType + '&pid=' + productId,
            title: productName,
            content: '向您推荐的旅游产品',
            thumbnailUrl: UrlHelper.retailMallUrl() + productImg,
            shareType: 1
        };
        shareModel.init(UrlHelper.shareUrl(), config);
        shareModel.open();
    }

}