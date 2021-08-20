import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Rx";
import { API_CONFIG } from "../../config/api.config";
import { CategoriaDTO } from "../../models/categoria.dto";
//para a classe ser injetável 
@Injectable()
export class CategoriaService {

    constructor(public http: HttpClient) {

    }

    findAll() : Observable<CategoriaDTO[]> {
        return this.http.get<CategoriaDTO[]>(`${API_CONFIG.baseUrl}/categorias`); // retorna o endpoint capturado da api com a lista de categorias dto, 
    }
}