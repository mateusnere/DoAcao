import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { SignupInstituicaoPage } from './../pages/signup-instituicao/signup-instituicao';

//Providers
import { DoadorService } from './../providers/doador.service';

const fireBaseConfig: FirebaseAppConfig = {
  apiKey: "AIzaSyApaL629_F2KgOnH7Im55xMmoI-o-sIiik",
  authDomain: "doacao-4b2e5.firebaseapp.com",
  databaseURL: "https://doacao-4b2e5.firebaseio.com",
  projectId: "doacao-4b2e5",
  storageBucket: "doacao-4b2e5.appspot.com",
  messagingSenderId: "530425748513"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    SignupPage,
    SignupInstituicaoPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SignupInstituicaoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DoadorService,
    AngularFireDatabase,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
