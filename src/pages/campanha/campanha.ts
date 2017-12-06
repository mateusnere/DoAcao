import { CampanhaVisualizarPage } from './visualizar/campanha-visualizar';
import { Campanha } from './../../models/campanha';
import { CampanhaService } from './../../providers/campanha.service';
import { CampanhaCadastroPage } from './cadastro/campanha-cadastro';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-campanha',
  templateUrl: 'campanha.html',
})
export class CampanhaPage {

  campanhas: Campanha[];

  constructor(
    public campanhaService: CampanhaService,
    public navCtrl: NavController, 
    public navParams: NavParams
  ) {
    
  }

  ionViewDidLoad() {
    this.campanhaService.listAllCampanhas().valueChanges().subscribe((campanhas: Campanha[]) => {
      this.campanhas = campanhas;
    });
  }

  novaCampanha(): void {
    this.navCtrl.push(CampanhaCadastroPage);
  }

  visualizarCampanha(campanha: Campanha): void {
    this.navCtrl.push(CampanhaVisualizarPage, {'campanhaVisualizar': campanha});
  }

}
