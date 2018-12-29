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

  constructor(public navCtrl: NavController, public fAuth: AngularFireAuth, private storage: Storage) {

  }

  signout_all(k){
    if(k==0){
      // this.logoutUser();
      this.storage.clear();
      // this.pushPage=LoginPage;
      this.navCtrl.setRoot(LoginPage);
    }
  }

  // logoutUser(): Promise<void> {
  //   return this.fAuth.auth().signOut();
  // }

}
