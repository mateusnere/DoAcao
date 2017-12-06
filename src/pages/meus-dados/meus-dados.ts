import { Instituicao } from './../../models/instituicao';
import { Doador } from './../../models/doador';
import { AngularFireDatabase } from 'angularfire2/database';
import { AuthService } from './../../providers/auth.service';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-meus-dados',
  templateUrl: 'meus-dados.html',
})
export class MeusDadosPage {

  doador: Doador;
  instituicao: Instituicao;
  isDoador: boolean;

  constructor(
    public afDatabase: AngularFireDatabase,
    public authService: AuthService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
      let uid = this.authService.afAuth.auth.currentUser.uid;
      this.afDatabase.object(`/doadores/${uid}`).valueChanges()
      .subscribe((doador: Doador) => {
        if(doador){
          this.doador = doador;
          this.isDoador = true;
        }else{
          this.afDatabase.object(`/instituicoes/${uid}`).valueChanges()
          .subscribe((instituicao: Instituicao) => {
            if(instituicao){
              this.instituicao = instituicao;
              this.isDoador = false;
              console.log(this.instituicao.razaoSocial);
            }
          });
        }
      });
  }

}
