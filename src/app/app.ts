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

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    this.cart = [...this.cart, { product, quantity: 1 }];
  }

  increment(product: Product): void {
    this.cart = this.cart.map((item) =>
      item.product === product ? { ...item, quantity: item.quantity + 1 } : item,
    );
  }

  decrement(product: Product): void {
    this.cart = this.cart
      .map((item) => (item.product === product ? { ...item, quantity: item.quantity - 1 } : item))
      .filter((item) => item.quantity > 0);
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter((item) => item.product !== product);
  }

  clearCart(): void {
    this.cart = [];
  }
}
