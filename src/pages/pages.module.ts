import { NgModule } from '@angular/core';

import { HomePageModule } from '../pages/home/home.module';
import { SearchIndexPageModule } from '../pages/search-index/search-index.module';
import { TicketIndexPageModule } from '../pages/ticket-index/ticket-index.module';
import { HotelIndexPageModule } from '../pages/hotel-index/hotel-index.module';
import { SupplierStorePageModule } from '../pages/supplier-store/supplier-store.module';
import { LineDetailPageModule } from '../pages/line-detail/line-detail.module';
import { TicketDetailPageModule } from '../pages/ticket-detail/ticket-detail.module';
import { OrderPageModule } from '../pages/order/order.module';
import { InvoicePageModule } from "../pages/invoice/invoice.module";
import { OrderCompletePageModule } from "../pages/order-complete/order-complete.module";
import { VisitorPageModule } from "../pages/visitor/visitor.module";
import { ShippingPageModule } from "../pages/shipping/shipping.module";
import { VisitorEditPageModule } from "../pages/visitor-edit/visitor-edit.module";
import { VisitorOrderPageModule } from "../pages/visitor-order/visitor-order.module";
import { SupplierInfoPageModule } from "../pages/supplier-info/supplier-info.module";
import { UesChatPageModule } from '../pages/ues-chat/ues-chat.module';
import { SupplierPageModule } from '../pages/supplier/supplier.module';
import { HotelDetailPageModule } from "../pages/hotel-detail/hotel-detail.module";
import { LineSearchResultPageModule } from '../pages/line-search-result/line-search-result.module';
import { HotelSearchResultPageModule } from '../pages/hotel-search-result/hotel-search-result.module';
import { TicketSearchResultPageModule } from '../pages/ticket-search-result/ticket-search-result.module';
import { ArriveAtCityPageModule } from '../pages/arrive-at-city/arrive-at-city.module';
import { SetOutCityPageModule } from '../pages/set-out-city/set-out-city.module';
import { SingleIndexPageModule } from '../pages/single-index/single-index.module';
import { SingleDetailPageModule } from '../pages/single-detail/single-detail.module';
import { LineIndexPageModule } from '../pages/line-index/line-index.module';
import { SingleSearchResultPageModule } from '../pages/single-search-result/single-search-result.module';
import { QqChatPageModule } from '../pages/qq-chat/qq-chat.module';
import { ShippingEditPageModule } from '../pages/shipping-edit/shipping-edit.module';
import { InvoiceEditPageModule } from '../pages/invoice-edit/invoice-edit.module';

@NgModule({
    imports: [
        HomePageModule,
        SearchIndexPageModule,
        TicketIndexPageModule,
        HotelIndexPageModule,
        SupplierStorePageModule,
        LineDetailPageModule,
        TicketDetailPageModule,
        OrderPageModule,
        InvoicePageModule,
        OrderCompletePageModule,
        VisitorPageModule,
        ShippingPageModule,
        VisitorEditPageModule,
        VisitorOrderPageModule,
        SupplierInfoPageModule,
        UesChatPageModule,
        SupplierPageModule,
        HotelDetailPageModule,
        LineSearchResultPageModule,
        HotelSearchResultPageModule,
        TicketSearchResultPageModule,
        ArriveAtCityPageModule,
        SetOutCityPageModule,
        SingleIndexPageModule,
        SingleDetailPageModule,
        LineIndexPageModule,
        SingleSearchResultPageModule,
        QqChatPageModule,
        ShippingEditPageModule,
        InvoiceEditPageModule
    ],
    declarations: [],
    providers: [],
    exports: []
})
export class PagesModule { }