import { Component, signal } from '@angular/core';
import { Cart } from './components/cart/cart';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { ProductList } from './components/product-list/product-list';
import { PRODUCTS } from './data/products';
import { CartItem, Product } from './models/product';

@Component({
  imports: [ProductList, Cart, OrderConfirmation],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  products: Product[] = PRODUCTS;
  cart: CartItem[] = [];
  orderConfirmed = false;

  // A signal, so the page updates when the timer clears it
  toastMessage = signal('');
  private toastTimer?: ReturnType<typeof setTimeout>;

  get cartTotal(): number {
    return this.cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  addToCart(product: Product): void {
    this.cart = [...this.cart, { product, quantity: 1 }];
    this.showToast(`${product.name} added to cart`);
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

  startNewOrder(): void {
    this.clearCart();
    this.orderConfirmed = false;
  }

  private showToast(message: string): void {
    this.toastMessage.set(message);
    clearTimeout(this.toastTimer);
    this.toastTimer = setTimeout(() => this.toastMessage.set(''), 2500);
  }
}
