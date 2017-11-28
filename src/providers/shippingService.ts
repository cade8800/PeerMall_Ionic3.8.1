import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Shipping } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class ShippingService {

    constructor(private http: HttpService) { }

    get() {
        return this.http.get(UrlHelper.apiHost() + Shipping, {});
    }
    delete(shippingId: string) {
        return this.http.delete(UrlHelper.apiHost() + Shipping + shippingId);
    }
    add(paramObj: any) {
        return this.http.post(UrlHelper.apiHost() + Shipping, paramObj);
    }
    update(shippingId: string, paramObj: any) {
        return this.http.put(UrlHelper.apiHost() + Shipping + shippingId, paramObj);
    }

}