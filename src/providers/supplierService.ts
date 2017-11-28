import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Supplier_List, Supplier_Type, Supplier_Invite, Supplier_Info } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class SupplierService {

    constructor(public http: HttpService) { }

    getSuppliers(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Supplier_List, paramObj);
    }

    getTypes() {
        return this.http.get(UrlHelper.apiHost() + Supplier_Type, {});
    }

    invite(supplierId: number) {
        return this.http.post(UrlHelper.apiHost() + Supplier_Invite + supplierId + '/invite', {});
    }

    getInfo(supplierId: number) {
        return this.http.get(UrlHelper.apiHost() + Supplier_Info + supplierId, {});
    }

}