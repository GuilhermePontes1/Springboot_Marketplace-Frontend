import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { API_CONFIG } from "../config/api.config";
import { CredenciaisDTO } from "../models/credenciais.dto";


@Injectable()
export class AuthService {

    constructor(public http: HttpClient) {
    }

    authenticate(creds: CredenciaisDTO) {
        //"observe" é um terceiro argumento para pegar o header da resposta, é text pois o endpoint do login retorna resposta em texto, para o framework não tentar fazer um "Parse" no Json 
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'});

        
    }
}