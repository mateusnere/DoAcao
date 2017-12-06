import { CampanhaService } from './../../../providers/campanha.service';
import { AlertsService } from './../../../providers/alerts.service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-campanha-visualizar',
  templateUrl: 'campanha-visualizar.html',
})
export class CampanhaVisualizarPage {

    constructor(
        public alertsService: AlertsService,
        public campanhaService: CampanhaService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams
    ) {
    }

}
