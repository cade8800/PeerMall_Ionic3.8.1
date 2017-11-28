import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule, JsonpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HttpService } from '../providers/httpService';
import { CalendarModule } from 'ion2-calendar';

import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';

import { HomePage } from '../pages/home/home';
import { SearchIndexPage } from '../pages/search-index/search-index';
import { TicketIndexPage } from '../pages/ticket-index/ticket-index';
import { HotelIndexPage } from '../pages/hotel-index/hotel-index';
import { SupplierStorePage } from '../pages/supplier-store/supplier-store';
import { LineDetailPage } from '../pages/line-detail/line-detail';
import { TicketDetailPage } from '../pages/ticket-detail/ticket-detail';
import { OrderPage } from '../pages/order/order';
import { InvoicePage } from "../pages/invoice/invoice";
import { OrderCompletePage } from "../pages/order-complete/order-complete";
import { VisitorPage } from "../pages/visitor/visitor";
import { ShippingPage } from "../pages/shipping/shipping";
import { VisitorEditPage } from "../pages/visitor-edit/visitor-edit";
import { VisitorOrderPage } from "../pages/visitor-order/visitor-order";
import { SupplierInfoPage } from "../pages/supplier-info/supplier-info";
import { UesChatPage } from '../pages/ues-chat/ues-chat';
import { SupplierPage } from '../pages/supplier/supplier';
import { HotelDetailPage } from "../pages/hotel-detail/hotel-detail";
import { LineSearchResultPage } from '../pages/line-search-result/line-search-result';
import { HotelSearchResultPage } from '../pages/hotel-search-result/hotel-search-result';
import { TicketSearchResultPage } from '../pages/ticket-search-result/ticket-search-result';
import { ArriveAtCityPage } from '../pages/arrive-at-city/arrive-at-city';
import { SetOutCityPage } from '../pages/set-out-city/set-out-city';
import { SingleIndexPage } from '../pages/single-index/single-index';
import { SingleDetailPage } from '../pages/single-detail/single-detail';
import { LineIndexPage } from '../pages/line-index/line-index';
import { SingleSearchResultPage } from '../pages/single-search-result/single-search-result';
import { QqChatPage } from '../pages/qq-chat/qq-chat';
import { ShippingEditPage } from '../pages/shipping-edit/shipping-edit';
import { InvoiceEditPage } from '../pages/invoice-edit/invoice-edit';
import { ToastCtrl } from '../providers/toastController';
import { PagesModule } from '../pages/pages.module';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
  ],
  imports: [
    HttpModule,
    BrowserModule,
    CalendarModule,
    JsonpModule,
    PagesModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    SearchIndexPage,
    TicketIndexPage,
    HotelIndexPage,
    SupplierStorePage,
    LineDetailPage,
    TicketDetailPage,
    OrderPage,
    InvoicePage,
    OrderCompletePage,
    VisitorPage,
    ShippingPage,
    VisitorOrderPage,
    VisitorEditPage,
    SupplierInfoPage,
    UesChatPage,
    SupplierPage,
    HotelDetailPage,
    LineSearchResultPage,
    HotelSearchResultPage,
    TicketSearchResultPage,
    ArriveAtCityPage,
    SetOutCityPage,
    SingleIndexPage,
    SingleDetailPage,
    LineIndexPage,
    SingleSearchResultPage,
    QqChatPage,
    ShippingEditPage,
    InvoiceEditPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    HttpService,
    ToastCtrl,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule { }
