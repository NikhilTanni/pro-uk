import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { TabsPage } from '../tabs/tabs';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Storage } from '@ionic/storage';
import { NetworkInterface } from '@ionic-native/network-interface';
import { AuthenticationProvider } from '../../providers/authentication/authentication';

 export class User {
     email: string="";
     phone: number;
     password: string="";
 }

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  islogin:number=0;
  name="";
  age:number;
  mynumber:number;
  e1_name="";
  e1_num:number;
  e2_name=""
  e2_num:number;
  moredet="";
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
    private auth: AuthenticationProvider,
    private storage: Storage,
    public afd: AngularFireDatabase,
    private networkInterface: NetworkInterface
  ) {
  //this.pushPage = TabsPage;

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
      this.init_database();
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
        this.all_dia[1]="Diagnosis";
      }
      else{
        this.all_dia[1]="No Diagnosis";
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

  get_gender(g){
    if(g==0){
      if(this.gender=='Male'){
        return 1;
      }
      else{
        return 0;
      }
}
else if(g==1){
if(this.gender=='Female'){
        return 1;
      }
      else{
        return 0;
      }
}
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
      this.storage.set("setting_diagon",this.all_dia[0]);
      this.storage.set("setting_allergy",this.all_dia[1]);
      this.storage.set("setting_user_det_key",1);
      this.storage.set("setting_setting_data_fetch",1);
    }
  }

  async login() {
    try {
      var r = await this.auth.afauth.auth.signInWithEmailAndPassword(
        this.user.email,
        this.user.password
      );
      this.auth.afauth.authState.subscribe(data=>{
        this.uid = data.uid;
        this.init_firebase_retreave(data.uid);
        this.storage.set("setting_user_id",data.uid);
        this.storage.set("login_user_is_login",1);
        this.storeEmailAndPass();
      })
      if (r) {
        console.log("Successfully logged in!");
        this.storage.set("login_user_is_login",1);
        this.storage.set("setting_user_det_key",1);
        this.storeEmailAndPass();
        this.islogin=1;
        this.next();
      }

    } catch (err) {
      if(err['code']=="auth/user-not-found"){
        this.register();
        this.islogin=0;
        this.next();
      }
      else{
        console.error(err);
        this.error="Failed to Auth! check all credentials properly! if problem still persist, Please contact service center!";
        // this.navCtrl.setRoot(LoginPage);
      }
    }
  }

  storeEmailAndPass(){
    this.storage.set("email", this.user.email);
    this.storage.set("password", this.user.password);
  }

  async register() {
    try {
      var r = await this.auth.afauth.auth.createUserWithEmailAndPassword(
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
    this.auth.afauth.authState.subscribe(data=>{
      this.uid = data.uid;
      this.storage.set("setting_user_id",data.uid);
      this.storage.set("login_user_is_login",1);
      this.storeEmailAndPass();

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
    if(this.islogin==0){
      var reg_info={
        'time' : new Date().toISOString(),
        'ip' : ip_arr
      }
      this.afd.list('/userdata/'+this.uid+'/registerinfo/').push(reg_info);
      var user_det={
        'name' : 'xyzname',
        'email' : this.user.email,
        'gender' : this.gender,
        'dob' : '40-13-3004'
      }
      console.log(user_det);
      this.afd.list('/userdata/'+this.uid+'/userinfo/').push(user_det);

      var app_set={
        'setting_name':this.name,
        'setting_age':this.age,
        'setting_mynumber':this.mynumber,
        'setting_e1_name':this.e1_name,
        'setting_e1_num':this.e1_num,
        'setting_e2_name':"-not-updated-",
        'setting_e2_num':"-not-updated-",
        'setting_allergy':this.all_dia[0],
        'setting_diagon':this.all_dia[1],
        'setting_moredet':this.moredet,
        'setting_user_det_key':"-not-updated-",
        'setting_api_url':"https://amplivelist.herokuapp.com/temp/",
        'setting_shake_sensitivity':this.sensitivity,
        'setting_sms_s1_send':"true",
        'setting_sms_s2_send':"true"
      }
      this.afd.list('/userdata/'+this.uid+'/appdata/setting_backup/').push(app_set);
    }
    else{


      var app_set={
        'setting_name':this.name,
        'setting_age':this.age,
        'setting_mynumber':this.mynumber,
        'setting_e1_name':this.e1_name,
        'setting_e1_num':this.e1_num,
        'setting_e2_name':"-not-updated-",
        'setting_e2_num':"-not-updated-",
        'setting_allergy':this.all_dia[0],
        'setting_diagon':this.all_dia[1],
        'setting_moredet':this.moredet,
        'setting_user_det_key':"-not-updated-",
        'setting_api_url':"https://amplivelist.herokuapp.com/temp/",
        'setting_shake_sensitivity':this.sensitivity,
        'setting_sms_s1_send':"true",
        'setting_sms_s2_send':"true"
      }
      this.afd.list('/userdata/'+this.uid+'/appdata/setting_backup').subscribe((data)=>{
        this.afd.list('/userdata/'+this.uid+'/registerinfo/').update(data[0].$key,app_set);
      });
    }

  }



  init_firebase_retreave(u_id){
    this.afd.list('/userdata/'+u_id+"/appdata/setting_backup/")
      .subscribe(
        (data) => {
          console.log(data[0]);
          this.name=data[0]['setting_name'];
          this.age=data[0]['setting_age'];
          this.mynumber=data[0]['setting_mynumber'];
          this.e1_name=data[0]['setting_e1_name'];
          this.e1_num=data[0]['setting_e1_num'];
          this.gender=data[0]['setting_gender'];
          this.all_dia[0]=data[0]['setting_allergy'];
          this.all_dia[1]=data[0]['setting_diagon'];
          this.moredet=data[0]['setting_moredet'];
          this.sensitivity=data[0]['setting_shake_sensitivity'];

        }
      )
    }



}
