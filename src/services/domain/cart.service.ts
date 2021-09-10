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
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // procura pelo o id do produto no carrinho, se encontrar retorna -1, 
        if (position == -1) { 
            cart.items.push({quantidade: 1, produto: produto});// se o produto não existir no carrinho ele adiciona ou incrementa em outro metodo
        }
        this.storage.setCart(cart);
        return cart;
    }
    
    removeProduto(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // procura pelo o id do produto no carrinho
        if (position != -1) { // nesse caso se for diferente de 1 o produto foi encontrado!
            cart.items.splice(position, 1);// então o produto é removido do carrinho, então indica a sua posição, e o numero 1 que indica remoção
        }
        this.storage.setCart(cart); // retorna o carrinho atualizado
        return cart;
    }
    increaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // procura pelo o id do produto no carrinho
        if (position != -1) {             // nesse caso se for diferente de 1 o produto foi encontrado!
            cart.items[position].quantidade++;// então o produto é incrementado a outros de mesmo id no carrinho.
        }
        this.storage.setCart(cart); // retorna o carrinho atualizado
        return cart;
    }
    decreaseQuantity(produto: ProdutoDTO) : Cart {
        let cart = this.getCart();
        let position = cart.items.findIndex(x => x.produto.id == produto.id); // procura pelo o id do produto no carrinho
        if (position != -1) {             // nesse caso se for diferente de 1 o produto foi encontrado!
            cart.items[position].quantidade--; // então o produto sofre redução de sua quantidade(decrementa).
            
            if(cart.items[position].quantidade < 1) {
                cart = this.removeProduto(produto)
            }
        }
        this.storage.setCart(cart); // retorna o carrinho atualizado
        return cart;
    }

    total() : number {
        let cart = this.getCart();
        let sum = 0
        for (var i=0; i<cart.items.length; i++) {
            sum += cart.items[i].produto.preco * cart.items[i].quantidade
        }
        return sum;

    }

}