import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../providers/auth.service';
import { Doador } from './../../models/doador';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Component({
  selector: 'page-doador',
  templateUrl: 'doador.html',
})
export class DoadorPage {

  nomeCurrentDoador: string;

  constructor(
    public afDatabase: AngularFireDatabase,
    public authService: AuthService,
    public navCtrl: NavController,
    public navParams: NavParams) {
    }
    
    ionViewDidLoad(){
      let uid = this.authService.afAuth.auth.currentUser.uid;
      this.afDatabase.object(`/doadores/${uid}`).valueChanges()
      .subscribe((doador: Doador) => {
        this.nomeCurrentDoador = doador.nome;
      });
    }

}
