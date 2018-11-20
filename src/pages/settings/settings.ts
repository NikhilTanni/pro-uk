import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  sensitivity:number;
  api_url:any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
    this.init_data();
  }

  init_data(){
    this.storage.get('api_url').then((val) => {
      this.api_url=val;
    });
    this.storage.get('shake_sensitivity').then((val) => {
      this.sensitivity=val;
    });
  }

  setvalue(m){
    if(m==1){
      this.storage.set("shake_sensitivity",this.sensitivity);
    }
    else if(m==2){
      this.storage.set("api_url",this.api_url);
    }
  }

}
