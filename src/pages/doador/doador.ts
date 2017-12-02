import { NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-doador',
  templateUrl: 'doador.html',
})
export class DoadorPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams) {
  }

}
