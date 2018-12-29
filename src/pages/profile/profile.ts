import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SettingsPage } from '../settings/settings';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {
pushPage: any;
name:any;
e1_name:any;
e1_num:any;
  constructor(public navCtrl: NavController, private storage: Storage) {
    this.pushPage = SettingsPage;
    this.init_data();
  }

  init_data(){
    this.storage.get('setting_name').then((val) => {
      this.name=val;
    });
    this.storage.get('setting_e1_name').then((val) => {
      this.e1_name=val;
    });
    this.storage.get('setting_e1_num').then((val) => {
      this.e1_num=val;
    });
  }

}
