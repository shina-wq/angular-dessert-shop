import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  @Input() products: Product[] = [];
  @Input() cart: CartItem[] = [];

  @Output() add = new EventEmitter<Product>();
  @Output() increment = new EventEmitter<Product>();
  @Output() decrement = new EventEmitter<Product>();

  // How many of this product are in the cart (0 if none)
  quantityOf(product: Product): number {
    const item = this.cart.find((i) => i.product === product);
    return item ? item.quantity : 0;
  }
}
