import { Component } from '@angular/core';
import { Cart } from './components/cart/cart';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { ProductList } from './components/product-list/product-list';
import { PRODUCTS } from './data/products';
import { CartItem, Product } from './models/product';

@Component({
  selector: 'app-root',
  imports: [ProductList, Cart, OrderConfirmation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  products: Product[] = PRODUCTS;
  cart: CartItem[] = [];
  orderConfirmed = false;

  get cartTotal(): number {
    let total = 0;
    for (const item of this.cart) {
      total += item.product.price * item.quantity;
    }
    return total;
  }

  addToCart(product: Product): void {
    this.cart.push({ product, quantity: 1 });
  }

  increment(product: Product): void {
    const item = this.cart.find((i) => i.product === product);
    if (item) {
      item.quantity++;
    }
  }

  decrement(product: Product): void {
    const item = this.cart.find((i) => i.product === product);
    if (!item) return;

    item.quantity--;
    if (item.quantity === 0) {
      this.removeFromCart(product);
    }
  }

  removeFromCart(product: Product): void {
    this.cart = this.cart.filter((i) => i.product !== product);
  }

  startNewOrder(): void {
    this.cart = [];
    this.orderConfirmed = false;
  }
}
