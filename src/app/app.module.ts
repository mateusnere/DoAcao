import { EventoService } from './../providers/evento.service';
import { EventoEditarPage } from './../pages/evento/editar/evento-editar';
import { EventoVisualizarPage } from './../pages/evento/visualizar/evento-visualizar';
import { EventoCadastroPage } from './../pages/evento/cadastro/evento-cadastro';
import { EventoPage } from './../pages/evento/evento';
import { CampanhaEditarPage } from './../pages/campanha/editar/campanha-editar';
import { CampanhaVisualizarPage } from './../pages/campanha/visualizar/campanha-visualizar';
import { CampanhaService } from './../providers/campanha.service';
import { AlertsService } from './../providers/alerts.service';
import { CampanhaCadastroPage } from './../pages/campanha/cadastro/campanha-cadastro';
import { CampanhaPage } from './../pages/campanha/campanha';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { AngularFireModule, FirebaseAppConfig } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';

//Pages
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SignupPage } from './../pages/signup/signup';
import { SignupInstituicaoPage } from './../pages/signup-instituicao/signup-instituicao';
import { DoadorPage } from './../pages/doador/doador';
import { InstituicaoPage } from './../pages/instituicao/instituicao';
import { MeusDadosPage } from './../pages/meus-dados/meus-dados';

//Providers
import { DoadorService } from './../providers/doador.service';
import { AuthService } from './../providers/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { InstituicaoSevice } from './../providers/instituicao.service';

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
    SignupInstituicaoPage,
    DoadorPage,
    InstituicaoPage,
    MeusDadosPage,
    CampanhaPage,
    CampanhaCadastroPage,
    CampanhaVisualizarPage,
    CampanhaEditarPage,
    EventoPage,
    EventoCadastroPage,
    EventoVisualizarPage,
    EventoEditarPage,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    AngularFireModule.initializeApp(fireBaseConfig),
    AngularFireAuthModule,
    AngularFireDatabaseModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    SignupPage,
    SignupInstituicaoPage,
    DoadorPage,
    InstituicaoPage,
    MeusDadosPage,
    CampanhaPage,
    CampanhaCadastroPage,
    CampanhaVisualizarPage,
    CampanhaEditarPage,
    EventoPage,
    EventoCadastroPage,
    EventoVisualizarPage,
    EventoEditarPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    DoadorService,
    InstituicaoSevice,
    AuthService,
    AlertsService,
    CampanhaService,
    EventoService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
