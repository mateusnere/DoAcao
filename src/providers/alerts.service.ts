import { LoadingController } from 'ionic-angular/components/loading/loading-controller';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { Loading } from 'ionic-angular/components/loading/loading';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AlertsService {

  constructor(
    public alertCtrl: AlertController,
    public http: Http,
    public loadingCtrl: LoadingController
  ) {
    
  }

  showLoading(): Loading {
    let loading: Loading = this.loadingCtrl.create({
      content: 'Aguarde...'
    });
    loading.present();
    return loading;
  }

  showAlert(msg: string): void {
    this.alertCtrl.create({
      message: msg,
      buttons: ['OK']
    }).present();
  }

}
