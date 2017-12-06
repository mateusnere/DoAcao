import { Campanha } from './../../../models/campanha';
import { AuthService } from './../../../providers/auth.service';
import { CampanhaService } from './../../../providers/campanha.service';
import { AlertsService } from './../../../providers/alerts.service';
import { Loading } from 'ionic-angular/components/loading/loading';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-campanha-cadastro',
  templateUrl: 'campanha-cadastro.html',
})
export class CampanhaCadastroPage {

    cadastroCampanhaForm: FormGroup;
    campanha: Campanha;

    constructor(
        public authService: AuthService,
        public alertsService: AlertsService,
        public campanhaService: CampanhaService,
        public formBuilder: FormBuilder,
        public navCtrl: NavController, 
        public navParams: NavParams
    ) {
        this.cadastroCampanhaForm = this.formBuilder.group({
            nome:['',[Validators.required, Validators.minLength(3)]],
            data: ['', Validators.required],
            descricao: ['', [Validators.required, Validators.minLength(5)]]
        });
        this.campanha = new Campanha("","",new Date().toISOString(),"","");
    }

    cadastrar(): void {
        let loading: Loading = this.alertsService.showLoading();
        this.campanha.idUser = this.authService.afAuth.auth.currentUser.uid;
        this.campanha.uid = `${this.campanha.idUser}_${this.campanha.data.slice(0,10)}`;
        this.campanhaService.create(this.campanha)
        .then(() => {
            loading.dismiss();
            this.navCtrl.pop();
            this.alertsService.showAlert("Sucesso ao cadastrar campanha!");
        }).catch((error: any) => {
            loading.dismiss();
            this.alertsService.showAlert(error);
        });
    }

}
