import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cart } from './components/cart/cart';
import { OrderConfirmation } from './components/order-confirmation/order-confirmation';
import { ProductList } from './components/product-list/product-list';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-root',
  imports: [ProductList, Cart, OrderConfirmation],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly confirmed = toSignal(inject(OrderService).confirmed$, { requireSync: true });
}
