import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Doador } from './../models/doador';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()
export class DoadorService {

  doadores: Observable<Doador[]>

  constructor(
    public angularFireDatabase: AngularFireDatabase,
    public http: Http) {
    this.doadores = this.angularFireDatabase.list(`/doadores`).valueChanges();
  }

  create(doador: Doador){
    return this.angularFireDatabase.list(`/doadores`).push(doador);
  }
}
