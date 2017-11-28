import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Agency_MySupplier, Agency_Info } from './constants';

@Injectable()
export class AgencyService {
    constructor(public http: HttpService) { }

    getMySupplierList(paramObj: any) {
        return this.http.post(Agency_MySupplier, paramObj);
    }

    getAgencyInfo(paramObj: any) {
        return this.http.get(Agency_Info, paramObj)
    }
}