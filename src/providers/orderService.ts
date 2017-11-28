import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Order } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class OrderService {

    constructor(private http: HttpService) { }

    submit(paramObj: any) {
        return this.http.post(UrlHelper.apiHost() + Order, paramObj);
    }

}