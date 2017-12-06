import { Observable } from 'rxjs/Observable';
import { Campanha } from './../models/campanha';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BaseService } from './base.service';

@Injectable()
export class CampanhaService extends BaseService{

  campanhas: Observable<Campanha[]>;

  constructor(
    public afDataBase: AngularFireDatabase,
    public http: Http
  ) {
    super();
    //this.campanhas = this.afDataBase.list(`/campanhas`).valueChanges();
  }

  create(campanha: Campanha): Promise<Campanha>{
    return this.afDataBase.object(`campanhas/${campanha.uid}`)
            .set(campanha)
            .catch(this.handlePromiseError);
  }

}
