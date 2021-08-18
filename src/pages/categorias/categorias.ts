import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
import { CategoriaDTO } from '../../models/categoria.dto';
import { CategoriaService } from '../../services/domain/categoria.service';

/**
 * Generated class for the CategoriasPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {
  
  bucketUrl: string = API_CONFIG.bucketBaseUrl

  items: CategoriaDTO[]; // ESSA vai ser a lista exposta no controlador

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }
   //Busca categorias no cliente da API
  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(response => {this.items=response},

    error => {
      console.log(error);
      });
    
    
  }

}
