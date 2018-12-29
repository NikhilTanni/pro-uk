import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { AlertPage } from '../pages/alert/alert';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = TabsPage;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private storage: Storage
  ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      this.check_login_init();
    });
  }

  check_login_init(){
    this.storage.get('login_user_is_login').then((val) => {
      if(val!=1){
        this.rootPage=LoginPage;
      }
    });
    this.storage.get('setting_all_done').then((val) => {
      if(val!=1){
        this.rootPage=LoginPage;
      }
    });
  }
}
