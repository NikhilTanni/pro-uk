import { Component, Injectable } from '@angular/core';
import { NavController } from 'ionic-angular';
//import { Shake } from '@ionic-native/shake';
//import { BackgroundMode } from '@ionic-native/background-mode';
//import { LocalNotifications } from '@ionic-native/local-notifications';
import { Storage } from '@ionic/storage';
// import { AlertController } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { SMS } from '@ionic-native/sms';

import { DetailsinputPage } from '../detailsinput/detailsinput';
import { SettingsPage } from '../settings/settings';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
@Injectable()
export class HomePage {

  feedkey=true;
  testmessage="";
  sensitivity:number=20;
  api_url="";
  data:any={"name":"","age":"","mynumber":"","e1_name":"","e1_num":"","e2_name":"","e2_num":"","moredet":""};
  constructor(
    public navCtrl: NavController,
    //private shake: Shake,
    //private backgroundMode: BackgroundMode,
    //private localNotifications: LocalNotifications,
    private storage: Storage,
    public http: Http,
    private sms: SMS,
    // private alertCtrl: AlertController
        ) {
    // this.shake_init();
    // this.backgroundMode.enable();
    this.check_details_feed();


  }

  ionViewDidEnter(){
    this.check_details_feed();
    this.testhttp();
  }

  check_details_feed(){
    this.storage.get('user_det_key').then((val) => {
      if(val==null){
        this.feedkey=false;
      }
      else if(val=="1"){
        this.feedkey=true;
        this.init_data();
      }
    });
  }


  testhttp(){


    let requestData={
      "secureID" : "secureTY",
      "location" : "lat,lon",
      "userName" : this.data['name']
    }


    var link = 'https://amplivelist.herokuapp.com/temp/';

    // this.storage.get('api_url').then((val) => {
    //     link=val;
    //   });
    //alert("Working");
    var myData = JSON.stringify(requestData);
    this.http.post(link, myData)
      .map(res => res.json())
      .subscribe(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });

  }



  init_data(){
    // let dat=["name","age","mynumber","e1_name","e1_num","e2_name","e2_num","moredet"];
    // var k="";
    // for (var i in dat)
    //   k=k+`this.storage.get('`+dat[i]+`').then((val) => {
    //     this.data['`+dat[i]+`']=val;
    //   });
    //   `;

    this.storage.get('name').then((val) => {
        this.data['name']=val;
      });
      this.storage.get('age').then((val) => {
        this.data['age']=val;
      });
      this.storage.get('mynumber').then((val) => {
        this.data['mynumber']=val;
      });
      this.storage.get('e1_name').then((val) => {
        this.data['e1_name']=val;
      });
      this.storage.get('e1_num').then((val) => {
        this.data['e1_num']=val;
      });
      this.storage.get('e2_name').then((val) => {
        this.data['e2_name']=val;
      });
      this.storage.get('e2_num').then((val) => {
        this.data['e2_num']=val;
      });
      this.storage.get('moredet').then((val) => {
        this.data['moredet']=val;
      });
      this.storage.get('api_url').then((val) => {
        this.api_url=val;
      });
      this.storage.get('shake_sensitivity').then((val) => {
        this.sensitivity=val;
      });


    // for(var i=0;i<8;i++){
    //   this.storage.get(dat[i]).then((val) => {
    //     this.data[dat[i]+""]=val;
    //     console.log(this.data);
    //   });
    // }
    // console.log(this.data);

    // console.log(k);
  }
  shake_init(){
    const watch = this.shake.startWatch(this.sensitivity).subscribe(() => {
      // do something

      this.sms.send(this.data['e1_num'], 'EMERGENCY ALERT! \n '+this.data['name']+' has requested for alert! \n PLEASE HELP!!');
      this.localNotifications.schedule({
        id: 1,
        title: 'ALERT! EMERGENCY!!',
        text: this.data['name']+' has requested EMERGENCY!',
        actions: [
          { id: 'call1', title: 'call'+this.data['e1_name'], },
          { id: 'call2',  title: 'call'+this.data['e2_name'] }
        ]
        // sound: isAndroid? 'file://sound.mp3': 'file://beep.caf',
        // data: { secret: key }
      });
    });
    // this.sms.send(this.data['e2_num'], 'EMERGENCY ALERT! \n '+this.data['name']+' has requested for alert! \n PLEASE HELP!!');
    this.testhttp();
    // watch.unsubscribe();

    // LocalNotifications.on("click",(notification,state) => {
    //   let alert = this.alertCtrl.create({
    //     title: 'Clicked on NOTI',
    //     subTitle: 'Calling the person!!',
    //     buttons: ['ok']
    //   });
    //
    // });
  }


  open_page(p){
    if(p==1){
      this.navCtrl.push(DetailsinputPage);
    }
    else if(p==2){
      this.navCtrl.push(SettingsPage);
    }
  }





}
