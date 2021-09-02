import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CidadeDTO } from "../../models/cidade.dto";
//para a classe ser injetável 
@Injectable()
export class CidadeService {
 
    constructor(public http: HttpClient) {

    }

    findAll(estado_id : string) : Observable<CidadeDTO[]> {
        return this.http.get<CidadeDTO[]>(`${API_CONFIG.baseUrl}/estados/${estado_id}/cidades`); // retorna o endpoint capturado da api com a lista de categorias dto, 
    }
}