import { EventoService } from './../../../providers/evento.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { EventoEditarPage } from './../editar/evento-editar';
import { Evento } from './../../../models/evento';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-evento-visualizar',
    templateUrl: 'evento-visualizar.html',
})
export class EventoVisualizarPage {
    
    evento: Evento;
    dia: string;
    mes: string;
    ano: string;
    dataApresentacao: string;

    constructor(
        public alertCtrl: AlertController,
        public eventoService: EventoService,
        public navCtrl: NavController, 
        public navParams: NavParams) {
        this.evento = this.navParams.get('eventoVisualizar');
        this.ano = this.evento.data.substr(0,4);
        this.mes = this.evento.data.substr(5,2);
        this.dia = this.evento.data.substr(8,2);
        this.dataApresentacao = `${this.dia}/${this.mes}/${this.ano}`;
    }

    editarEvento(){
        this.navCtrl.push(EventoEditarPage, {'eventoEditar': this.evento});
    }

    removerEvento(){
        this.alertCtrl.create({
            message: 'Tem certeza que deseja remover esse evento?',
            buttons: [
                {
                    text: 'Sim',
                    handler: () => {
                        this.eventoService.deleteEvento(this.evento);
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