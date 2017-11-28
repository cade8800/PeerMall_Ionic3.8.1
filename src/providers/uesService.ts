import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Ues_RoomNum } from './constants';
import { UrlHelper } from './utils';

@Injectable()
export class UesService {

    constructor(private http: HttpService) { }

    getRoomNum(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Ues_RoomNum, paramObj);
    }

}