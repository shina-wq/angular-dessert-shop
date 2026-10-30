import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  @Input({ required: true }) products!: Product[];
  @Input({ required: true }) cart!: CartItem[];

  @Output() add = new EventEmitter<Product>();
  @Output() increment = new EventEmitter<Product>();
  @Output() decrement = new EventEmitter<Product>();

  quantityOf(product: Product): number {
    return this.cart.find((item) => item.product === product)?.quantity ?? 0;
  }
}
