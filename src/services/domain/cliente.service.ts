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
    
        return this.http.get<ClienteDTO>(`${API_CONFIG.baseUrl}/clientes/email?value=${email}`); // com esse macete passa o cabeçalho para descriação {'headers' : authHeader}                                                                             
   
    }
    getImageFromBucket(id : string) : Observable<any> { // any casa com todo mundo
        let url = `${API_CONFIG.bucketBaseUrl}/cp${id}.jpg`
        return this.http.get(url, {responseType : 'blob'}); // blob = imagem
    }
    insert(obj : ClienteDTO) {
        return this.http.post(`${API_CONFIG.baseUrl}/clientes`,obj, {observe: 'response', responseType: 'text'});

    }
}