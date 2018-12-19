import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { CallNumber } from '@ionic-native/call-number';

@Component({
  selector: 'page-alert',
  templateUrl: 'alert.html'
})
export class AlertPage {

  lock_click:any=[0,0,0];
  emer_call:any=["9972284495","9035489865","9164175075"];
  constructor(
    public navCtrl: NavController,
    private callNumber: CallNumber
  ) {

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
