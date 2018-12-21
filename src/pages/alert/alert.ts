import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';
import { Shake } from '@ionic-native/shake';
import { Storage } from '@ionic/storage';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { BackgroundMode } from '@ionic-native/background-mode';
import { SMS } from '@ionic-native/sms';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {

  lock_click:any=[0,0,0];
  emer_call:any=["9972284495","9035489865","9164175075"];
  sensitivity:number=20;
  mydata:any=["myname","mynum","gnme","gnum"];
  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber,
    private shake: Shake,
    private backgroundMode: BackgroundMode,
    private ln: LocalNotifications,
    private storage: Storage,
    private sms: SMS
  ) {
    this.init_data()
    this.shake_init();
    this.backgroundMode.enable();
  }


  init_data(){
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
      this.sms.send(this.mydata[3], 'EMERGENCY ALERT! \n '+this.mydata[2]+' has requested for alert! \n PLEASE HELP!!');

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
