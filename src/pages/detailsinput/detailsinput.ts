import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DetailsinputPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detailsinput',
  templateUrl: 'detailsinput.html',
})
export class DetailsinputPage {

  name="";
  age:number;
  mynumber:number;
  e1_name="";
  e1_num:number;
  e2_name=""
  e2_num:number;
  moredet="";
  error="";
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsinputPage');
  }

  validate_input(){
    if(this.name==""){
      this.error="Name cannot be empty!!";
    }
    else if(!(this.age>0 && this.age<150)){
      this.error="Enter valid age!";
    }
    else if(this.mynumber<999999999){
      this.error="Invalid number - mynumber";
    }
    else if(this.e1_name==""){
      this.error="Emergence person 1 name cannot be empty!!";
    }
    else if(this.e1_num<999999999){
      this.error="Invalid number - Emergency person 1";
    }
    else if(this.e2_name==""){
      this.error="Emergence person 2 name cannot be empty!!";
    }
    else if(this.e2_num<999999999){
      this.error="Invalid number - Emergency person 2";
    }
    else{
      //success
      //save to storage
      this.storage.set("name",this.name);
      this.storage.set("age",this.age);
      this.storage.set("mynumber",this.mynumber);
      this.storage.set("e1_name",this.e1_name);
      this.storage.set("e1_num",this.e1_num);
      this.storage.set("e2_name",this.e2_name);
      this.storage.set("e2_num",this.e2_num);
      this.storage.set("moredet",this.moredet);
      this.storage.set("user_det_key",1);
      this.storage.set("api_url","http://172.0.0.100:3000");
      this.storage.set("shake_sensitivity",20);
      this.navCtrl.pop()
    }
  }

  random_values(){
    this.name="testname-"+this.random_uid();
    this.age=Math.floor(10 + Math.random() * 70);
    this.mynumber=Math.floor(9000000000 + (Math.random() * 9999990000));
    this.e1_name="guardian-"+this.random_uid();
    this.e1_num=Math.floor(9000000000 + (Math.random() * 9999990000));
    this.e2_name="guardian-"+this.random_uid();
    this.e2_num=Math.floor(9000000000 + (Math.random() * 9999990000));
    this.moredet="Blood group: B+, Allergic to : Dust, | sugar patient!";
  }

  random_uid(){
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4();
  }

}
