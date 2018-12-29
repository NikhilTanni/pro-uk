import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { NetworkInterface } from '@ionic-native/network-interface';

 export class User {
     email: string="test@test.com";
     phone: number;
     password: string="test@123";
 }

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  name="test";
  age:number=50;
  mynumber:number=9876543210;
  e1_name="guardian";
  e1_num:number=9988776655;
  e2_name=""
  e2_num:number;
  moredet="--";
  error="";
  uid:any="";
  gender:any="";
  sensitivity:number=100;
  shake_enable:any="true";
  all_dia=["Allergy","Diagnosis"];
  public user:User = new User();
   @ViewChild(Slides) slides: Slides;
   pushPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public fAuth: AngularFireAuth,
    private storage: Storage,
    public afd: AngularFireDatabase,
    private networkInterface: NetworkInterface
  ) {
  this.pushPage = TabsPage;

  }
    next() {
    this.slides.lockSwipes(false);
    this.slides.slideNext();
    this.slides.lockSwipes(true);
  }

  prev() {
    this.slides.slidePrev();
  }


  ionViewDidLoad() {
    // console.log('ionViewDidLoad LoginPage');
    this.slides.lockSwipes(true);
    this.storage.get('setting_user_det_key').then((val) => {
      if(val=="1"){
        this.get_saved_input_details()
      }
    });
  }


  save_all_details(m){
    if(m==1){
      this.storage.set("setting_name",this.name);
      this.storage.set("setting_age",this.age);
      this.storage.set("setting_e1_name",this.e1_name);
      this.storage.set("setting_e1_num",this.e1_num);
      this.storage.set("setting_uid",this.uid);
      this.storage.set("setting_gender",this.gender);
      this.storage.set("setting_all_dia",this.all_dia);
      this.storage.set("setting_shake_enable",this.shake_enable);
      this.storage.set("setting_all_done",1);
      this.next();
      this.navCtrl.setRoot(TabsPage);
    }
  }

  setvalue(m,v){
    if(m==1){
      if(v==1){
        this.gender="Male";
      }
      else if(v==2){
        this.gender="Female";
      }
      else{
        this.gender="N/A";
      }
    }
    else if(m==2){
      if(v==1){
        this.all_dia[0]="Allergy";
      }
      else{
        this.all_dia[0]="No Allergy";
      }
    }
    else if(m==3){
      if(v==1){
        this.all_dia[0]="Diagnosis";
      }
      else{
        this.all_dia[0]="No Diagnosis";
      }
    }
    else if(m==4){
      this.storage.set("setting_shake_sensitivity",this.sensitivity);
    }
    else if(m==5){
      console.log(this.shake_enable);
      //this.storage.set("setting_shake_enable",this.shake_enable);
    }
    console.log(this.gender);
    console.log(this.all_dia);
    console.log(this.sensitivity);
  }

  get_saved_input_details(){

    this.storage.get('setting_name').then((val) => {
      this.name=val;
    });
    this.storage.get('setting_age').then((val) => {
      this.age=val;
    });
    this.storage.get('setting_mynumber').then((val) => {
      this.mynumber=val;
    });
    this.storage.get('setting_e1_name').then((val) => {
      this.e1_name=val;
    });
    this.storage.get('setting_e1_num').then((val) => {
      this.e1_num=val;
    });
    this.storage.get('setting_e2_name').then((val) => {
      this.e2_name=val;
    });
    this.storage.get('setting_e2_num').then((val) => {
      this.e2_num=val;
    });
    this.storage.get('setting_moredet').then((val) => {
      this.moredet=val;
    });
  }

  validate_input(){
    this.mynumber=this.user.phone;
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
    else{
      //success
      //save to storage
      this.storage.set("setting_name",this.name);
      this.storage.set("setting_age",this.age);
      this.storage.set("setting_mynumber",this.mynumber);
      this.storage.set("setting_e1_name",this.e1_name);
      this.storage.set("setting_e1_num",this.e1_num);
      this.storage.set("setting_moredet",this.moredet);
      this.storage.set("setting_user_det_key",1);
      this.storage.set("setting_shake_sensitivity",20);
      this.storage.set("setting_sms_s1_send","true");
      this.storage.set("setting_user_det_key",1);
      this.storage.set("setting_setting_data_fetch",1);
    }
  }

  async login() {
    try {
      var r = await this.fAuth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.fAuth.authState.subscribe(data=>{
        this.uid = data.uid;
        this.storage.set("setting_user_id",data.uid);
        this.storage.set("login_user_is_login",1);
        this.storeEmailAndPass();
      })
      if (r) {
        console.log("Successfully logged in!");
        this.storage.set("login_user_is_login",1);
        this.storage.set("setting_user_det_key",1);
        this.storeEmailAndPass();
        this.next();
      }

    } catch (err) {
      if(err['code']=="auth/user-not-found"){
        this.register();
        this.next();
      }
      else{
        console.error(err);
        this.error="Failed to Auth! check all credentials properly! if problem still persist, Please contact service center!";
      }
    }
  }

  storeEmailAndPass(){
    this.storage.set("email", this.user.email);
    this.storage.set("password", this.user.password);
  }

  async register() {
    try {
      var r = await this.fAuth.auth.createUserWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      if (r) {
        console.log("Successfully registered!");
        this.login_post_reg();
      }

    } catch (err) {
      console.error(err);
      this.error="Failed to Register! Please contact service center!";
    }
  }

  login_post_reg(){
    this.fAuth.authState.subscribe(data=>{
      this.uid = data.uid;
      this.storage.set("setting_user_id",data.uid);
      this.storage.set("login_user_is_login",1);
      this.storeEmailAndPass();
      this.init_database();
    })
  }

  init_sett_done(){
    this.save_all_details(1);
  }
  init_database(){
    var ip_ad={"car_ip":":","wifi_ip":":"};
    this.networkInterface.getWiFiIPAddress()
      // .then(address => console.log(address.ip) )
      .then(wifiaddress => {

        this.networkInterface.getCarrierIPAddress()
          .then(carraddress => {
              ip_ad['car_ip']=carraddress.ip;
              ip_ad['wifi_ip']=wifiaddress.ip;
              this.update_with_ip(ip_ad);
          })
          .catch(error => {
            ip_ad['car_ip']="-";
            ip_ad['wifi_ip']=wifiaddress.ip;
            this.update_with_ip(ip_ad);
          });

      })
      .catch(error => {
        this.networkInterface.getCarrierIPAddress()
          .then(carraddress => {
              ip_ad['car_ip']=carraddress.ip;
              ip_ad['wifi_ip']="--";
              this.update_with_ip(ip_ad);
          })
          .catch(error => {
            ip_ad['car_ip']="---";
            ip_ad['wifi_ip']="----";
            this.update_with_ip(ip_ad);
          });
      });
  }

  update_with_ip(ip_arr){
    var reg_info={
      'time' : new Date().toISOString(),
      'ip' : ip_arr
    }
    this.afd.list('/userdata/'+this.uid+'/registerinfo/').push(reg_info);
    var user_det={
      'name' : 'xyzname',
      'email' : this.user.email,
      'phone' : this.user.phone,
      'gender' : 'male/female',
      'dob' : '40/13/3004'
    }
    this.afd.list('/userdata/'+this.uid+'/userinfo/').push(user_det);

    var app_set={
      'setting_name':"-not-updated-",
      'setting_age':"-not-updated-",
      'setting_mynumber':"-not-updated-",
      'setting_e1_name':"-not-updated-",
      'setting_e1_num':"-not-updated-",
      'setting_e2_name':"-not-updated-",
      'setting_e2_num':"-not-updated-",
      'setting_moredet':"-not-updated-",
      'setting_user_det_key':"-not-updated-",
      'setting_api_url':"https://amplivelist.herokuapp.com/temp/",
      'setting_shake_sensitivity':"20",
      'setting_sms_s1_send':"true",
      'setting_sms_s2_send':"true"
    }
    this.afd.list('/userdata/'+this.uid+'/appdata/setting_backup/').push(app_set);
  }

}
