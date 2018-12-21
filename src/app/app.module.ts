import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { SettingsPage } from '../pages/settings/settings';
import { ProfilePage } from '../pages/profile/profile';
import { AlertPage } from '../pages/alert/alert';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';


import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CallNumber } from '@ionic-native/call-number';
import { IonicStorageModule } from '@ionic/storage';
import { NetworkInterface } from '@ionic-native/network-interface';
import { Shake } from '@ionic-native/shake';
import { SMS } from '@ionic-native/sms';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';

import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth'

var config = {
    apiKey: "AIzaSyASZwRs3Dp2OEHauxRVMEAbA24YV69NX8A",
    authDomain: "pro1-2260c.firebaseapp.com",
    databaseURL: "https://pro1-2260c.firebaseio.com",
    projectId: "pro1-2260c",
    storageBucket: "pro1-2260c.appspot.com",
    messagingSenderId: "1035475716194"
  };

@NgModule({
  declarations: [
    MyApp,
    SettingsPage,
    ProfilePage,
    AlertPage,
    TabsPage,
    LoginPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(config),
    AngularFireAuthModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    SettingsPage,
    ProfilePage,
    AlertPage,
    TabsPage,
    LoginPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    CallNumber,
    NetworkInterface,
    Shake,
    SMS,
    LocalNotifications,
    BackgroundMode,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
