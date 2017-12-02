import { Instituicao } from './../models/instituicao';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import * as firebase from 'firebase/app';

@Injectable()
export class InstituicaoSevice extends BaseService {

  constructor(
    public angularFireDatabase: AngularFireDatabase,
    public http: Http) {
    super();
  }

  createInstituicao(instituicao: Instituicao): Promise<Instituicao> {
    return this.angularFireDatabase.object(`/instituicoes/${instituicao.uid}`)
              .set(instituicao)
              .catch(this.handlePromiseError);
  }

  instituicaoCNPJalreadyExists(cnpj: string): Observable<boolean> {
    return this.angularFireDatabase.list(`/instituicoes`, 
      (ref: firebase.database.Reference) => ref.orderByChild('cnpj').equalTo(cnpj)
    ).valueChanges()
    .map((instituicoes: Instituicao[]) => {
      return instituicoes.length > 0;
    }).catch(this.handleObservableError);
  }

}
