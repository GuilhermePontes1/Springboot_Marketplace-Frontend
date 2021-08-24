import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { ClienteDTO } from "../../models/cliente.dto";
import { StorageService } from "../storage_service";

@Injectable()
export class ClienteService {
    constructor(public http: HttpClient, public storage: StorageService) {

    }

    findByEmail(email : string) : Observable<ClienteDTO> {

        let token = this.storage.getLocalUser().token; // pega o token do storage
        let authHeader = new HttpHeaders({'Authorization': 'Bearer ' + token}); // esse é o cabeçalho que vai ser enviado
        //soluçoes temporárias
                                                                                         
    return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`, {'headers': authHeader}) // com esse macete passa o cabeçalho para descriação {'headers' : authHeader}                                                                             
    }
    getImageFromBucket(id : string) : Observable<any> { // any casa com todo mundo
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'}); // blob = imagem
    }
}