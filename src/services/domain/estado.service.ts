import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { EstadoDTO } from "../../models/estado.dto";
//para a classe ser injetável 

@Injectable()
export class EstadoService {

    constructor(public http: HttpClient) {

    }

    findAll() : Observable<EstadoDTO[]> {
        return this.http.get<EstadoDTO[]>(`${API_CONFIG.baseUrl}/estados`); // retorna o endpoint capturado da api com a lista de categorias dto, 
    }
}