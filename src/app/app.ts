import { Component } from '@angular/core';
import { Cart } from './components/cart/cart';
import { ProductList } from './components/product-list/product-list';
import { PRODUCTS } from './data/products';
import { CartItem, Product } from './models/product';

@Component({
  imports: [ProductList, Cart],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  products: Product[] = PRODUCTS;
  cart: CartItem[] = [];
}
