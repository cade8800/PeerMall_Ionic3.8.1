import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Account_UserInfo } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class AccountService {

    public static CurrentUserInfo: any = {};

    constructor(private http: HttpService) { }

    getInfo() {
        return this.http.get(UrlHelper.apiHost() + Account_UserInfo, {});
    }

}