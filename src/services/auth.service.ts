import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { LocalUser } from "../models/local_user";
import { StorageService } from "./storage_service";


@Injectable()
export class AuthService {

    constructor(public http: HttpClient, public storage : StorageService) {
    }

    authenticate(creds: CredenciaisDTO) {
        //"observe" é um terceiro argumento para pegar o header da resposta, é text pois o endpoint do login retorna resposta em texto, para o framework não tentar fazer um "Parse" no Json 
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'});
    }

    sucessfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7) // recorta o token para pegar a partir do 7º caracter, para não pegar a palavra berer.
        let user : LocalUser = { // temos aqui o local onde ira receber a variavel
            token: tok
        };

        this.storage.setLocalUser(user) // guardamos localstorage
    }
    
    logout() { 
        this.storage.setLocalUser(null) // remove o usuário do localstorage
    }
}