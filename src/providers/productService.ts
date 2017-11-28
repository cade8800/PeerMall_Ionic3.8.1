import { Injectable } from '@angular/core';
import { HttpService } from './httpService';
import { UrlHelper } from './utils';
import {
    Peer_Products,
    Peer_Hotel,
    Peer_Hotels,
    Peer_Line,
    Peer_Lines,
    Peer_Ticket,
    Peer_Tickets,
    Product_Themes,
    Hotel_Star,
    Peer_Singles,
    Peer_Singles_SubTypes,
    Peer_Single
} from '../providers/constants';

@Injectable()
export class ProductService {

    constructor(public http: HttpService) { }

    getProducts(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Peer_Products, paramObj);
    }

    getLines(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Peer_Lines, paramObj);
    }
    getHotels(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Peer_Hotels, paramObj);
    }
    getTickets(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Peer_Tickets, paramObj);
    }

    getLine(productId: string) {
        return this.http.get(UrlHelper.apiHost() + Peer_Line + productId, {});
    }
    getHotel(productId: string) {
        return this.http.get(UrlHelper.apiHost() + Peer_Hotel + productId, {});
    }
    getTicket(productId: string) {
        return this.http.get(UrlHelper.apiHost() + Peer_Ticket + productId, {});
    }

    getThemes() {
        return this.http.get(Product_Themes, {});
    }
    getHotelStar() {
        return this.http.get(Hotel_Star, {});
    }

    getSingles(paramObj: any) {
        return this.http.get(UrlHelper.apiHost() + Peer_Singles, paramObj);
    }
    getSingleSubTypes() {
        return this.http.get(UrlHelper.apiHost() + Peer_Singles_SubTypes, {});
    }

    getSingle(productId: string) {
        return this.http.get(UrlHelper.apiHost() + Peer_Single + productId, {});
    }

}