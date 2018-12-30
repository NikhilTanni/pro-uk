import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  sensitivity:number=0;
  constructor(public navCtrl: NavController, private auth: AuthenticationProvider, private storage: Storage) {
    this.init_vars();
  }

  signout_all(k){
    if(k==0){
      // this.logoutUser();
      this.auth.afauth.auth.signOut()
      .then(
        (val) => {
          console.log("Singed out success");
        }
      )
      .catch(
        (err) => {
          console.log(err);
        }
      )
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
