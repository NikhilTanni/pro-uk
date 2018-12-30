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
  alarm_g1:any=true;
  // alarm_g2:any=true;
  shake_enable=this.shake_sett_dums();
  warning:any="";
  constructor(public navCtrl: NavController, private auth: AuthenticationProvider, private storage: Storage) {
    this.init_vars();
  }

  signout_all(k){
    if(k==0){
      // this.logoutUser();
      this.auth.afauth.auth.signOut()
      .then(
        (val) => {
          this.storage.clear();
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
    this.storage.get('setting_shake_enable').then((val) => {
      this.shake_enable=val;
    });
  }

  shake_sett_dums(){
    this.storage.get('setting_shake_enable').then((val) => {
      return val;
    });
  }

  change_value(k){
    if(k==1){
      this.warning="You must restart app to apply changes!";
      this.storage.set("setting_shake_enable",this.shake_enable);
    }
    else if(k==2){
      this.warning="You must restart app to apply changes!";
      this.storage.set("setting_shake_sensitivity",this.sensitivity);
    }
    else if(k==3){
      this.alarm_g1=true;
    }
    // console.log(k);
  }

  // logoutUser(): Promise<void> {
  //   return this.fAuth.auth().signOut();
  // }

}
