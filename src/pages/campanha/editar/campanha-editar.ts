import { AlertsService } from './../../../providers/alerts.service';
import { CampanhaService } from './../../../providers/campanha.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Campanha } from './../../../models/campanha';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
    selector: 'page-campanha-editar',
    templateUrl: 'campanha-editar.html',
})
  
export class CampanhaEditarPage {

    campanha: Campanha;
    editaCampanhaForm: FormGroup;

    constructor(
        public alertsService: AlertsService,
        public campanhaService: CampanhaService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams
    ){
        this.editaCampanhaForm = this.formBuilder.group({
            nome:['',[Validators.required, Validators.minLength(3)]],
            data: ['', Validators.required],
            descricao: ['', [Validators.required, Validators.minLength(5)]]
        });
        this.campanha = this.navParams.get('campanhaEditar');
    }

    editarCampanha(){
        this.campanhaService.editCampanha(this.campanha);
        this.navCtrl.pop();
        this.alertsService.showAlert("Campanha alterada com sucesso!");
    }

}