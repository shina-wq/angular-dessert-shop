import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, Product } from '../../models/product';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  @Input({ required: true }) items!: CartItem[];
  @Input({ required: true }) total!: number;

  @Output() remove = new EventEmitter<Product>();
  @Output() clear = new EventEmitter<void>();
  @Output() confirm = new EventEmitter<void>();

  get count(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }
}
