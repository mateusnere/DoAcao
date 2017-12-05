import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Doador } from './../models/doador';
import { AngularFireDatabase } from 'angularfire2/database';
import { BaseService } from './base.service';
import 'rxjs/add/operator/map';
import * as firebase from 'firebase/app';

@Injectable()
export class DoadorService extends BaseService{

  doadores: Observable<Doador[]>;

  constructor(
    public angularFireDatabase: AngularFireDatabase,
    public http: Http) {
      super();
  }

  doadorEmailAlreadyExists(email: string): Observable<boolean> {
    return this.angularFireDatabase.list(`/doadores`, 
      (ref: firebase.database.Reference) => ref.orderByChild('email').equalTo(email)
    ).valueChanges()
    .map((doadores: Doador[]) => {
      return doadores.length > 0;
    }).catch(this.handleObservableError);
  }

  create(doador: Doador): Promise<Doador>{
    return this.angularFireDatabase.object(`/doadores/${doador.uid}`)
              .set(doador)
              .catch(this.handlePromiseError);
  }
}
