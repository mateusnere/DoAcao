import { Instituicao } from './../../models/instituicao';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { AuthService } from './../../providers/auth.service';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { InstituicaoSevice } from './../../providers/instituicao.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { Loading } from 'ionic-angular/components/loading/loading';
import * as firebase from 'firebase/app';
import { HomePage } from '../home/home';

@Component({
  selector: 'page-signup-instituicao',
  templateUrl: 'signup-instituicao.html',
})
export class SignupInstituicaoPage {

  signupInstituicaoForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public instituicaoService: InstituicaoSevice) {
      //let cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/;
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.signupInstituicaoForm = this.formBuilder.group({
        razaoSocial: ['', [Validators.required, Validators.minLength(3)]],
        //cnpj: ['',Validators.compose([Validators.required, Validators.pattern(cnpjRegex)])],
        cnpj: ['', Validators.required],
        email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        estado: ['', Validators.required],
        bairro: ['', [Validators.required, Validators.minLength(3)]],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  }

  cadastrar(instituicao: Instituicao): void {
    console.log(this.signupInstituicaoForm.value);
    let loading: Loading = this.showLoading();
    let formInstituicao = this.signupInstituicaoForm.value;
    this.authService.createAuthUser({
      email: formInstituicao.email,
      password: formInstituicao.password
    }).then((authUser: firebase.User) => {
      delete formInstituicao.password;
      formInstituicao.uid = authUser.uid;
      this.instituicaoService.createInstituicao(formInstituicao)
        .then(() => {
          loading.dismiss();
          this.navCtrl.setRoot(HomePage);
          this.showAlert("Sucesso ao cadastrar instituição!");
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