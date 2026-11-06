import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem, Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart {
  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() remove = new EventEmitter<Product>();
  @Output() confirm = new EventEmitter<void>();

  get count(): number {
    let count = 0;
    for (const item of this.items) {
      count += item.quantity;
    }
    return count;
  }
}
