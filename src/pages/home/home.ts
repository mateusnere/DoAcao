import { DoadorService } from './../../providers/doador.service';
import { Observable } from 'rxjs/Observable';
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

  constructor(public navCtrl: NavController, public doadorService: DoadorService) {
    this.doadores = this.doadorService.doadores;
  }

  onSignUpDoador(){
    this.navCtrl.push(SignupPage);
  }

  onSignUpInstituicao(){
    this.navCtrl.push(SignupInstituicaoPage);
  }

}
