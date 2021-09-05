import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage_service';
import { ClienteService } from '../services/domain/cliente.service';
import { ErrorInterceptorProvider } from '../interceptors/error-interceptor';
import { AuthInterceptorProvider } from '../interceptors/auth-interceptor';
import { ProdutoService } from '../services/domain/produto.service';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService, //então assim que iniciar a compilação do programa, ele irá chamar os metodos encadeados na CatetegoriaService                                   
    AuthInterceptorProvider,
    ErrorInterceptorProvider,
    AuthService,
    StorageService,
    ClienteService,
    ProdutoService
  ]
})
export class AppModule {}
