import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from 'firebase/app';



@Injectable()
export class AuthService {

  constructor(public http: Http, public afAuth: AngularFireAuth) {
    console.log("Hello provider!");
  }

  createAuthUser(user: {email: string, password: string}): Promise<firebase.User> {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

}
