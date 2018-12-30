import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  sensitivity:number=0;
  constructor(public navCtrl: NavController, public fAuth: AngularFireAuth, private storage: Storage) {
    this.init_vars();
  }

  signout_all(k){
    if(k==0){
      // this.logoutUser();
      this.storage.clear();
      // this.pushPage=LoginPage;
      this.navCtrl.setRoot(LoginPage);
    }
  }

  init_vars(){
    this.storage.get('setting_shake_sensitivity').then((val) => {
      this.sensitivity=val;
    });
  }

  // logoutUser(): Promise<void> {
  //   return this.fAuth.auth().signOut();
  // }

}
