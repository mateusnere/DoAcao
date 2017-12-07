import { EventoService } from './../../../providers/evento.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Evento } from './../../../models/evento';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-evento-editar',
    templateUrl: 'evento-editar.html',
})
export class EventoEditarPage {

    evento: Evento;
    editaEventoForm: FormGroup;
    
    constructor(
        public eventoService: EventoService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams) {
            this.editaEventoForm = this.formBuilder.group({
                nome:['',[Validators.required, Validators.minLength(3)]],
                local:['',[Validators.required, Validators.minLength(3)]],
                data: ['', Validators.required],
                descricao: ['', [Validators.required, Validators.minLength(5)]]
            });
            this.evento = this.navParams.get('eventoEditar');
      }

      editarEvento(){
        this.eventoService.editCampanha(this.evento);
        this.navCtrl.pop();
    }
}