import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoadorService } from './../../providers/doador.service';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import * as firebase from 'firebase/app';
import { Loading } from 'ionic-angular/components/loading/loading';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  
  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public doadorService: DoadorService) {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.signupForm = this.formBuilder.group({
        nome:['',[Validators.required, Validators.minLength(3)]],
        email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  }

  cadastrar(): void {
    console.log(this.signupForm.value);
    let loading: Loading = this.showLoading();
    let formUser = this.signupForm.value;
    this.authService.createAuthUser({
      email: formUser.email,
      password: formUser.password
    }).then((authUser: firebase.User) => {
      delete formUser.password;
      formUser.uid = authUser.uid;
      this.doadorService.create(formUser)
      .then(() => {
        console.log("Usuário cadastrado!");
        loading.dismiss();
        this.navCtrl.setRoot(HomePage);
        this.showAlert('Sucesso ao cadastrar doador!');
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      });
    }).catch((error: any) => {
      console.log(error);
      loading.dismiss();
      this.showAlert(error);
    });
  }

  private showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    loading.present();
    return loading;
  }

  private showAlert(msg: string): void {
    this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    }).present();
  }

}
