import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { ContactPage } from '../contact/contact';
import { AlertPage } from '../alert/alert';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlertPage;
  tab2Root = SettingsPage;
  tab3Root = ContactPage;

  constructor() {

  }
}
