import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
   @ViewChild(Slides) slides: Slides;
   pushPage: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  this.pushPage = TabsPage;

  }
    next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
