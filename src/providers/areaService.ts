import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { Area_Api } from './constants';

@Injectable()
export class AreaService {
    constructor(public http: HttpService) { }

    get(pid?: number) {
        return this.http.get(Area_Api, { top: 300, pid: 8 | pid });
    }

    getHot() {
        return this.http.get(Area_Api, { hot: true });
    }
}