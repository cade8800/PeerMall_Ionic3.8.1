import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Invoice } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class InvoiceService {

    constructor(public http: HttpService) { }

    get() {
        return this.http.get(UrlHelper.apiHost() + Invoice, {});
    }
    delete(shippingId: string) {
        return this.http.delete(UrlHelper.apiHost() + Invoice + shippingId);
    }
    add(paramObj: any) {
        return this.http.post(UrlHelper.apiHost() + Invoice, paramObj);
    }
    update(shippingId: string, paramObj: any) {
        return this.http.put(UrlHelper.apiHost() + Invoice + shippingId, paramObj);
    }

}