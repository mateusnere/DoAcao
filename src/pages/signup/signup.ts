import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DoadorService } from './../../providers/doador.service';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  signupForm: FormGroup;
  
  constructor(
    public formBuilder: FormBuilder,
    public navCtrl: NavController, 
    public navParams: NavParams,
    public doadorService: DoadorService) {
      let emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      this.signupForm = this.formBuilder.group({
        nome:['',[Validators.required, Validators.minLength(3)]],
        username: ['',[Validators.required, Validators.minLength(3)]],
        email: ['',Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        password: ['',[Validators.required, Validators.minLength(6)]]
      });
  }

  cadastrar(): void {
    console.log(this.signupForm.value);
    this.doadorService.create(this.signupForm.value)
      .then(() => {
        console.log("Usuário cadastrado!");
      });
  }

}
