import { AngularFireDatabase } from 'angularfire2/database';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AuthService } from '../../providers/auth.service';
import { Instituicao } from '../../models/instituicao';

@Component({
  selector: 'page-instituicao',
  templateUrl: 'instituicao.html',
})
export class InstituicaoPage {

  nomeCurrentInstituicao: string;

  constructor(
    public afDatabase: AngularFireDatabase,
    public authService: AuthService,
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

  ionViewDidLoad(){
    let uid = this.authService.afAuth.auth.currentUser.uid;
    this.afDatabase.object(`/instituicoes/${uid}`).valueChanges()
    .subscribe((instituicao: Instituicao) => {
      this.nomeCurrentInstituicao = instituicao.razaoSocial;
    });
  }

}
