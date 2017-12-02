import { InstituicaoPage } from './../instituicao/instituicao';
import { DoadorPage } from './../doador/doador';
import { Observable } from 'rxjs';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AuthService } from './../../providers/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoadorService } from './../../providers/doador.service';
import { Doador } from './../../models/doador';
import { SignupInstituicaoPage } from './../signup-instituicao/signup-instituicao';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SignupPage } from './../signup/signup';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  doadores: Observable<Doador[]>;
  signinForm: FormGroup;

  constructor(
    public alertCtrl: AlertController,
    public authService: AuthService,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, 
    public doadorService: DoadorService) {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.doadores = this.doadorService.doadores;
      this.signinForm = this.formBuilder.group({
        email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
    }

  signin(){
    let loading: Loading = this.showLoading();
    let email = this.signinForm.value.email;
    this.authService.signWithEmail(this.signinForm.value)
      .then((isLogged: Boolean) => {
        if(isLogged){
          this.doadorService.doadorEmailAlreadyExists(email).subscribe((isDoador: boolean) => {
            if(isDoador){
              this.navCtrl.setRoot(DoadorPage);
            }else{
              this.navCtrl.setRoot(InstituicaoPage);
            }
            loading.dismiss();
          });
        }
      }).catch((error: any) => {
        console.log(error);
        loading.dismiss();
        this.showAlert(error);
      })
  }

  onSignUpDoador(){
    this.navCtrl.push(SignupPage);
  }

  onSignUpInstituicao(){
    this.navCtrl.push(SignupInstituicaoPage);
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