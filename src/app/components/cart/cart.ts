import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  protected readonly cart = inject(CartService);
  protected readonly order = inject(OrderService);
  protected readonly util = inject(UtilService);

  // toSignal subscribes now and unsubscribes when the component is destroyed.
  // requireSync works because the cart's BehaviorSubject emits immediately.
  protected readonly items = toSignal(this.cart.items$, { requireSync: true });
  protected readonly count = toSignal(this.cart.count$, { requireSync: true });
  protected readonly total = toSignal(this.cart.total$, { requireSync: true });
  protected readonly isEmpty = toSignal(this.cart.isEmpty$, { requireSync: true });
}
