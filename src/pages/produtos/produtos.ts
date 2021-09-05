import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';


@IonicPage()
@Component({

  selector: 'page-produtos',
  templateUrl: 'produtos.html',

})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {

  }

  ionViewDidLoad() {
    let categoria_id = this.navParams.get('categoria_id') // pego o valor que foi declarado como parametro na pagina de categoria
    this.produtoService.findByCategoria(categoria_id).subscribe(reponse =>{this.items = reponse['content']}
    ,error => {}) // aqui pegamos a lista de produtos da categoria pedida

  }
}
