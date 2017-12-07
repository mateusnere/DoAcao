import { CampanhaEditarPage } from './../editar/campanha-editar';
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
    dia: string;
    mes: string;
    ano: string;
    dataApresentacao: string;

    constructor(
        public alertCtrl: AlertController,
        public alertsService: AlertsService,
        public campanhaService: CampanhaService,
        public navCtrl: NavController, 
        public navParams: NavParams
    ) {
        this.campanha = this.navParams.get('campanhaVisualizar');
        this.ano = this.campanha.data.substr(0,4);
        this.mes = this.campanha.data.substr(5,2);
        this.dia = this.campanha.data.substr(8,2);
        this.dataApresentacao = `${this.dia}/${this.mes}/${this.ano}`;
    }

    editarCampanha(){
        this.navCtrl.push(CampanhaEditarPage, {'campanhaEditar': this.campanha});
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
