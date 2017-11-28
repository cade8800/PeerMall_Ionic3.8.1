import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Visitor } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class VisitorService {

    constructor(private http: HttpService) { }

    get() {
        return this.http.get(UrlHelper.apiHost() + Visitor, {});
    }
    delete(visId: string) {
        return this.http.delete(UrlHelper.apiHost() + Visitor + visId);
    }
    add(paramObj: any) {
        return this.http.post(UrlHelper.apiHost() + Visitor, paramObj);
    }
    update(paramObj: any) {
        return this.http.put(UrlHelper.apiHost() + Visitor, paramObj);
    }

}