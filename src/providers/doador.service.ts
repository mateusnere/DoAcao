import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Doador } from './../models/doador';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DoadorService {

  doadores: Observable<Doador[]>;

  constructor(
    public angularFireDatabase: AngularFireDatabase,
    public http: Http) {
  }

  create(doador: Doador){
    return this.angularFireDatabase.object(`/doadores/${doador.uid}`)
              .set(doador);
  }
}
