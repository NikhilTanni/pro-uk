import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';


@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
pushPage: any;
  constructor(public navCtrl: NavController) {
this.pushPage = SettingsPage;
  }

}
