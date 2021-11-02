import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { StorageService } from '../../services/storage_service';
import { ProdutoDetailPage } from '../produto-detail/produto-detail';


@IonicPage()
@Component({
  selector: 'page-pick-adress',
  templateUrl: 'pick-adress.html',
})
export class PickAdressPage {

  items: EnderecoDTO[];

  pedido : PedidoDTO;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams, 
    public storage:StorageService,
    public clienteService: ClienteService,
    public cartService : CartService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser()// se exister localuser, conseguimos localizar e inicar a classe
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email)
      .subscribe(response => {this.items = response['enderecos']; 

      let cart = this.cartService.getCart();

      this.pedido = { 
        cliente: {id : response ['id']},
        enderecoDeEntrega : null,
        pagamento: null,
        itens : cart.items.map( x => { return {quantidade: x.quantidade , produto: {id : x.produto.id}}})
        //Lambda que percorre a lista convertendo parra o objeto em questão para consumo do json gerado pela API
      }
    }, 
        error => {
          if(error.status == 403) {
            this.navCtrl.setRoot('HomePage')
          }

        }) 
       
    }
    else {
      this.navCtrl.setRoot('HomePage')
    }
  }

  nextPage(item : EnderecoDTO) {
    this.pedido.enderecoDeEntrega = {id: item.id};
    console.log(this.pedido)
  }

}