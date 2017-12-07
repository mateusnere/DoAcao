import { Campanha } from './../models/campanha';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { BaseService } from './base.service';

@Injectable()
export class CampanhaService extends BaseService{

  constructor(
    public afDataBase: AngularFireDatabase,
    public http: Http
  ) {
    super();
  }

  create(campanha: Campanha): Promise<Campanha>{
    return this.afDataBase.object(`/campanhas/${campanha.uid}`)
            .set(campanha)
            .catch(this.handlePromiseError);
  }

  listAllCampanhas() {
    return this.afDataBase.list(`/campanhas`);
  }

  deleteCampanha(campanha: Campanha){
    return this.afDataBase.object(`/campanhas/${campanha.uid}`).remove().catch(this.handlePromiseError);
  }

  editCampanha(campanha: Campanha){
    return this.afDataBase.object(`/campanhas/${campanha.uid}`).update(campanha).catch(this.handlePromiseError);
  }

}
