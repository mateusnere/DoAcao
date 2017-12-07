import { EventoService } from './../../../providers/evento.service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { AuthService } from './../../../providers/auth.service';
import { AlertsService } from './../../../providers/alerts.service';
import { Evento } from './../../../models/evento';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-evento-cadastro',
    templateUrl: 'evento-cadastro.html',
})
export class EventoCadastroPage {
    
    cadastroEventoForm: FormGroup;
    evento: Evento;

    constructor(
        public authService: AuthService,
        public alertsService: AlertsService,
        public eventoService: EventoService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams) {
            this.cadastroEventoForm = this.formBuilder.group({
                nome:['',[Validators.required, Validators.minLength(3)]],
                local:['',[Validators.required, Validators.minLength(3)]],
                data: ['', Validators.required],
                descricao: ['', [Validators.required, Validators.minLength(5)]]
            });
            this.evento = new Evento("","","",new Date().toISOString(),"","");
      }

      cadastrar(): void{
        let loading: Loading = this.alertsService.showLoading();
        this.evento.idUser = this.authService.afAuth.auth.currentUser.uid;
        this.evento.uid = `${this.evento.idUser}_${this.evento.data.slice(0,10)}`;
        this.eventoService.create(this.evento)
        .then(() => {
            loading.dismiss();
            this.navCtrl.pop();
            this.alertsService.showAlert("Sucesso ao cadastrar evento!");
        }).catch((error: any) => {
            loading.dismiss();
            this.alertsService.showAlert(error);
        });
      }
}