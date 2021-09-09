import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { API_CONFIG } from '../../config/api.config';
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
    let categoria_id = this.navParams.get('categoria_id'); // pego o valor que foi declarado como parametro na pagina de categoria
    this.produtoService.findByCategoria(categoria_id).subscribe(response => {this.items = response['content']
    this.loadImageUrls() 
  },
    error => {}) // aqui pegamos a lista de produtos da categoria pedida

  }
  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) { // percorre a lista de "items" dentro de produtos buscando associar seu ID com a imagem
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`
        },
        error => {});
    }
  }
  
  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  } 
}


