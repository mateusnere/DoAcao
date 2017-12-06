import { Observable } from 'rxjs';
import { Campanha } from './../../models/campanha';
import { CampanhaService } from './../../providers/campanha.service';
import { CampanhaCadastroPage } from './cadastro/campanha-cadastro';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'page-campanha',
  templateUrl: 'campanha.html',
})
export class CampanhaPage {

  campanhas: Observable<Campanha[]>;

  constructor(
    public campanhaService: CampanhaService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    this.campanhas = this.campanhaService.campanhas;
  }

  novaCampanha(): void {
    this.navCtrl.push(CampanhaCadastroPage);
  }

}
