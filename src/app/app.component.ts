import { HomePage } from './../pages/home/home';
import { AuthService } from './../providers/auth.service';
import { MeusDadosPage } from './../pages/meus-dados/meus-dados';
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  @ViewChild(Nav) public nav: Nav;

  public paginas = [
    {titulo: 'Meus Dados', componente: MeusDadosPage},
    {titulo: 'Campanhas de Arrecadação', componente: 'teste'},
    {titulo: 'Eventos de Interação', componente: 'teste'}
  ];

  constructor(
      public authService: AuthService,
      platform: Platform, 
      statusBar: StatusBar, 
      splashScreen: SplashScreen) {
         
        platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        statusBar.styleDefault();
        splashScreen.hide();
    });
  }

  abrePagina(pagina): void {
    this.nav.push(pagina.componente);
  }

  logout(): void {
    this.authService.logout();
    this.nav.setRoot(HomePage);
  }
}

