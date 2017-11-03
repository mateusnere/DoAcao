import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2'

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

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
    HomePage
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
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
