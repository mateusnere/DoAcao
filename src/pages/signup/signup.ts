import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoadorService } from './../../providers/doador.service';
import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth.service';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  
  constructor(
    public authService: AuthService,
    public formBuilder: FormBuilder,
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
      });
    }).catch((error: any) => {
      console.log(error);
    });
  }

}
