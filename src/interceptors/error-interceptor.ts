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


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
 
    constructor(public storage : StorageService) {

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
       case 403:
         this.handle403()
         break;
     }

        return Observable.throw(error)}) as any;
    
  }

  handle403(){
    this.storage.setLocalUser(null); // Se cair em error 403, ele limpa o localUser

  }


}
 
  export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,

  };
