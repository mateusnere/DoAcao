import { EventoVisualizarPage } from './visualizar/evento-visualizar';
import { EventoService } from './../../providers/evento.service';
import { Evento } from './../../models/evento';
import { EventoCadastroPage } from './cadastro/evento-cadastro';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-evento',
  templateUrl: 'evento.html',
})
export class EventoPage {

  eventos: Evento[];

  constructor(
    public eventoService: EventoService,
    public navCtrl: NavController, 
    public navParams: NavParams) {

  }

  ionViewDidLoad() {
    this.eventoService.listAllEventos().valueChanges().subscribe((eventos: Evento[]) => {
      this.eventos = eventos;
    }); 
  }

  novoEvento(){
    this.navCtrl.push(EventoCadastroPage);
  }

  visualizarEvento(evento: Evento) {
    this.navCtrl.push(EventoVisualizarPage, {'eventoVisualizar' : evento});
  }

}
