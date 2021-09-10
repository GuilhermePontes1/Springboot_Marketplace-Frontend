import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { JwtHelper } from "angular2-jwt";
import { API_CONFIG } from "../config/api.config";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";
import { CredenciaisDTO } from "../models/credenciais.dto";
import { localUser } from "../models/local_user";
import { StorageService } from "./storage_service";


@Injectable()
export class AuthService {

    jwtHelper: JwtHelper = new JwtHelper();

    constructor(public http: HttpClient, public storage : StorageService) {
    }

    authenticate(creds: CredenciaisDTO) {
        //"observe" é um terceiro argumento para pegar o header da resposta, é text pois o endpoint do login retorna resposta em texto, para o framework não tentar fazer um "Parse" no Json 
        return this.http.post(`${API_CONFIG.baseUrl}/login`, creds, {observe: 'response', responseType: 'text'});
    }
    refreshToken() {
        // metodo para o usuário não ficar o tempo todo colocando senha, basicamente ele faz o refresh token, ou seja recupera o token, nesse caso o token é de 24h
        return this.http.post(`${API_CONFIG.baseUrl}/auth/refresh_token`, {}, {observe: 'response', responseType: 'text'});
    }

    sucessfulLogin(authorizationValue : string) {
        let tok = authorizationValue.substring(7) // recorta o token para pegar a partir do 7º caracter, para não pegar a palavra berer.
        let user : localUser = { // temos aqui o local onde ira receber a variavel
            token: tok,
            email : this.jwtHelper.decodeToken(tok).sub
        };

        this.storage.setLocalUser(user) // guardamos localstorage
    }
    
    logout() { 
        this.storage.setLocalUser(null) // remove o usuário do localstorage
    }

    getCart() : Cart {
        let str = localStorage.getItem(STORAGE_KEYS.cart);
        if (str != null) {
            return JSON.parse(str);
        }
        else {
            return null;
        }
    }

    setCart(obj : Cart) {
        if (obj != null) {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        } 
        else {
            localStorage.removeItem(STORAGE_KEYS.cart);
        }
    }

}