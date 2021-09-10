import { Injectable } from '@angular/core';
import { Cart } from '../../models/cart';
import { ProdutoDTO } from '../../models/produto.dto';
import { StorageService } from '../storage_service';

@Injectable()
export class CartService {

    constructor(public storage: StorageService) {
    }

    createOrClearCart() : Cart {
        let cart: Cart = {items: []};
        this.storage.setCart(cart);
        return cart;
    }

    getCart() : Cart {
        let cart: Cart = this.storage.getCart();
        if (cart == null) {
            cart = this.createOrClearCart();
        }
        return cart;
    }

    addProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // procura pelo o id do produto no carrinho, se não encontrar retorna -1, 
        if (position == -1) { 
            cart.items.push({quantidade: 1, produto: produto});// se o produto não existir no carrinho ele adiciona
        }
        this.storage.setCart(cart);
        return cart;
    }
}