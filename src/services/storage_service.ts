import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { localUser } from "../models/local_user";

@Injectable()
export class StorageService {
   // Salva e armazena usuário logado
    getLocalUser() : localUser { // retorna o usuário logado
        let usr = localStorage.getItem(STORAGE_KEYS.localUser)
        if(usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr); // localstorage armazena String por isso precisamos passar para JSON
        }
    }

    setLocalUser(obj : localUser) {//recebe o localuser e armazena o usuário logado ou seja armazena o localuser no storage
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser)
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj)) // aqui faz o processo inverso de transformar em JSON transforma para String
        }
    }
}