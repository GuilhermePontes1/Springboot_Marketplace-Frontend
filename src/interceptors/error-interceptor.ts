import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { StorageService } from '../services/storage_service';
import { AlertController } from 'ionic-angular';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 
    constructor(public storage : StorageService, public alertCtrl : AlertController) {

    }

    intercept( request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).catch((error, caught) => {  
     
    let errorObj = error
     if(errorObj = error) {
         errorObj = errorObj.error;
         
     }

     if(!errorObj.status) {
         errorObj = JSON.parse(errorObj);
     }

     console.log("Erro detectado pelo interceptor:");

     console.log(errorObj)

     switch(errorObj.status) { // feito parra lidar com cada tipo de erro
      
      case 401: 
      this.handle401()
      break;
      
      case 403:
         this.handle403()
         break;
    
      default:
          this.handleDefaultError(errorObj);
   
     }

   
      return Observable.throw(error)}) as any;
    
  }

  handle403(){
    this.storage.setLocalUser(null); // Se cair em error 403, ele limpa o localUser

  }
  handle401(){
    let alert = this.alertCtrl.create({
      title: 'Erro 401: falha de autenticação',
      message: 'Email ou senha incorretos',
      enableBackdropDismiss: false,
      buttons: [
        {text:'ok'}
      ]
    });
 
    alert.present();
  }

  handleDefaultError(errorObj) {
    let alert = this.alertCtrl.create({
      title: 'Erro' + errorObj.status  + ': ' + errorObj.error ,
      message: errorObj.message,
      enableBackdropDismiss: false,
      buttons: [
        {text:'Ok'}
      ]
    });

    alert.present();
  }

}
 
  export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

  };
