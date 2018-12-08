import { Component } from '@angular/core';

import { SettingsPage } from '../settings/settings';
import { ProfilePage } from '../profile/profile';
import { AlertPage } from '../alert/alert';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = AlertPage;
  tab2Root = ProfilePage;

  constructor() {

  }
}
