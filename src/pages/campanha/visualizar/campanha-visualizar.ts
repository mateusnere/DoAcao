import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Campanha } from './../../../models/campanha';
import { CampanhaService } from './../../../providers/campanha.service';
import { AlertsService } from './../../../providers/alerts.service';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-campanha-visualizar',
  templateUrl: 'campanha-visualizar.html',
})
export class CampanhaVisualizarPage {

    campanha: Campanha;

    constructor(
        public alertCtrl: AlertController,
        public alertsService: AlertsService,
        public campanhaService: CampanhaService,
        public navCtrl: NavController, 
        public navParams: NavParams
    ) {
        this.campanha = this.navParams.get('campanhaVisualizar');
    }

    removerCampanha(){
        this.alertCtrl.create({
            message: 'Tem certeza que deseja remover essa campanha?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.campanhaService.deleteCampanha(this.campanha);
                        this.navCtrl.pop();
                    }
                },
                {
                    text: 'Não'
                }
            ]
        }).present();
    }

}
