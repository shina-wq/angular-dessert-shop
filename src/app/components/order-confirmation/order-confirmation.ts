import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-order-confirmation',
  imports: [CurrencyPipe],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation {
  private readonly cart = inject(CartService);
  protected readonly order = inject(OrderService);
  protected readonly util = inject(UtilService);

  protected readonly items = toSignal(this.cart.items$, { requireSync: true });
  protected readonly total = toSignal(this.cart.total$, { requireSync: true });
}
