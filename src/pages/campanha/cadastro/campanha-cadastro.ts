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
    }

    cadastrar(): void {
        let loading: Loading = this.alertsService.showLoading();
        let formCampanha = this.cadastroCampanhaForm.value;
        formCampanha.idUser = this.authService.afAuth.auth.currentUser.uid;
        formCampanha.uid = `${formCampanha.nome}_${formCampanha.data}`;
        this.campanhaService.create(formCampanha)
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
