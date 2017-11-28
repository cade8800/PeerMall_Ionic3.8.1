import { Component } from '@angular/core';

import { UesChatPage } from '../ues-chat/ues-chat';
import { SupplierPage } from '../supplier/supplier';
import { HomePage } from '../home/home';
import { UrlHelper } from '../../providers/utils';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = UesChatPage;
  tab3Root = SupplierPage;

  constructor() { }

  uesChat() {
    window.location.href = UrlHelper.uesUrl();
  }
}
