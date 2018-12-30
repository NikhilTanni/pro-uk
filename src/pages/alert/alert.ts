import { Component, ViewChild } from '@angular/core';
import { NavController, Content } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { Shake } from '@ionic-native/shake';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMS } from '@ionic-native/sms';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {
  @ViewChild(Content) content: Content;
  sos_classname:String="";
  em_classname_0:String="but1 ";
  em_classname_1:String="but1 ";
  em_classname_2:String="but1 ";
em_classname_3:String="but1 ";
  lock_click:any=[0,0,0];
  sos_click:any=[0];
  emer_call:any=["9972284495","9035489865","9164175075"];
  sensitivity:number=20;
  mydata:any=["myname","mynum","gnme","gnum","uid"];
  email: string="test@test.com";
  password: string="test@123";
  help_info_app:any=[0,0,0,0,0,0];
  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private shake: Shake,
    private backgroundMode: BackgroundMode,
    private ln: LocalNotifications,
    private storage: Storage,
    private sms: SMS,
    private afd: AngularFireDatabase,
    private auth: AuthenticationProvider
  ) {
    this.init_data();
    try{
      this.shake_init();
    }
    catch(exception){
      console.log(exception);
    }
    // this.init_firebase_retreave();
    this.backgroundMode.enable();
  }

  scrollToBottom(){
    this.content.scrollToBottom();
  }

  next_app_info_help(k){
    if(k==1){
      this.help_info_app=[1,0,1,0,0,0];
      this.sos_classname="";
      this.em_classname_0=this.em_classname_0+"em_class_0";
    }
    else if(k==2){
      this.help_info_app=[1,0,0,1,0,0];
      this.em_classname_0="but1 ";
      this.em_classname_1=this.em_classname_1+"em_class_0";
    }
    else if(k==3){
      this.help_info_app=[1,0,0,0,1,0];
      this.em_classname_1="but1 ";
      this.em_classname_2=this.em_classname_2+"em_class_0";
    }
    else if(k==4){
      this.help_info_app=[1,0,0,0,0,1];
      this.em_classname_2="but1 ";
      //
    }
    else if(k==5){
      this.help_info_app=[0,0,0,0,0,0];
      this.em_classname_3="but1 ";
      this.storage.set("app_help_info",1);
    }
  }

  init_data(){
    this.storage.get('app_help_info').then((val) => {
      if(val!=1){
        this.help_info_app=[1,1,0,0,0,0];
        this.sos_classname="sos_btn_app_info";
      }
      else{
        //dont show help
      }
    });

    this.storage.get('setting_name').then((val) => {
      this.mydata[0]=val;
    });
    this.storage.get('setting_mynumber').then((val) => {
      this.mydata[1]=val;
    });
    this.storage.get('setting_e1_name').then((val) => {
      this.mydata[2]=val;
    });
    this.storage.get('setting_e1_num').then((val) => {
      this.mydata[3]=val;
    });
    this.storage.get('setting_shake_sensitivity').then((val) => {
      this.sensitivity=val;
    });
    this.storage.get('setting_uid').then((val) => {
      this.mydata[4]=val;
    });
    this.storage.get('email').then((val) => {
      if(val)
        this.email=val;
    });
    this.storage.get('password').then((val) => {
      if(val)
        this.password=val;
    });
  }



  sos_press(){

    this.ln.schedule({
      id: 2,
      title: 'ALERT! EMERGENCY!!',
      text: this.mydata[0]+' (phone : '+this.mydata[1]+') \n Gurdian: '+this.mydata[2]+' : '+this.mydata[3],
      actions: [
        { id: 'call1', title: 'call '+this.mydata[2] }
      ]
    });
    this.sendsms();
    if(this.sos_click[0]==0){
      this.sos_click[0]=1;
    }
    else if(this.sos_click[0]==1){
      this.callnumber(this.mydata[3].toString());
      this.sos_click[0]=0;
    }
  }


  shake_init(){
    const watch = this.shake.startWatch(this.sensitivity).subscribe(() => {
      // do something

      this.ln.schedule({
        id: 2,
        title: 'ALERT! EMERGENCY!!',
        text: this.mydata[0]+' (phone : '+this.mydata[1]+') \n G1: '+this.mydata[2]+' : '+this.mydata[3],
        actions: [
          { id: 'call1', title: 'call '+this.mydata[3] }
        ]
      });
      this.sendsms();
    });

    // watch.unsubscribe();

  }

  sendsms(){
      this.sms.send(this.mydata[3].toString(), 'EMERGENCY ALERT! \n '+this.mydata[2]+' has requested for alert! \n PLEASE HELP!!');

  }

  emergency_call(m){
    if(this.lock_click[m]==0){
      this.lock_click[m]=1;
    }
    else{
      this.lock_click[m]=0;
      this.callnumber(this.emer_call[m]);
    }
  }

  callnumber(number){
    this.callNumber.callNumber(number, true)
    .then(res => console.log('Launched dialer! ->'+number, res))
    .catch(err => console.log('Error launching dialer ->'+number, err));
  }


}
