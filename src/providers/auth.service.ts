import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';
import { BaseService } from './base.service';



@Injectable()
export class AuthService extends BaseService{

  constructor(public http: Http, public afAuth: AngularFireAuth) {
    super();
    console.log("Hello provider!");
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password)
            .catch(this.handlePromiseError);
  }

  signWithEmail(user: {email: string, password: string}): Promise<boolean> {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password)
            .then((authUser: firebase.User) => {
              return authUser != null;
            }).catch(this.handlePromiseError);
  }

}
