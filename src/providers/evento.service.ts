import { Evento } from './../models/evento';
import { AngularFireDatabase } from 'angularfire2/database';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable()
export class EventoService extends BaseService{

  constructor(
    public afDatabase: AngularFireDatabase,
    public http: Http) {
    super();
  }

  create(evento: Evento): Promise<Evento>{
    return this.afDatabase.object(`/eventos/${evento.uid}`)
              .set(evento)
              .catch(this.handlePromiseError);
  }

  listAllEventos(){
    return this.afDatabase.list(`/eventos`);
  }

  deleteEvento(evento: Evento) {
    return this.afDatabase.object(`/eventos/${evento.uid}`).remove().catch(this.handlePromiseError);
  }

  editCampanha(evento: Evento){
    return this.afDatabase.object(`/eventos/${evento.uid}`).update(evento).catch(this.handlePromiseError);
  }

}
