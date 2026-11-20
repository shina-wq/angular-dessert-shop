import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from './cart.service';
import { LoggerService } from './logger.service';
import { UtilService } from './util.service';

// Checkout flow: confirming an order and starting a new one.
@Injectable({ providedIn: 'root' })
export class OrderService {
  private readonly cart = inject(CartService);
  private readonly logger = inject(LoggerService);
  private readonly util = inject(UtilService);

  private readonly confirmedSubject = new BehaviorSubject(false);
  readonly confirmed$ = this.confirmedSubject.asObservable();

  confirm(): void {
    const items = this.cart.currentItems;

    if (items.length === 0) {
      this.logger.warn('Tried to confirm an empty order');
      return;
    }

    this.confirmedSubject.next(true);
    this.logger.info('Order confirmed', {
      items: this.util.itemCount(items),
      total: this.util.orderTotal(items),
    });
  }

  startNew(): void {
    this.cart.clear();
    this.confirmedSubject.next(false);
    this.logger.info('Started a new order');
  }
}
