import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { CartItem } from '../../models/product';

@Component({
  selector: 'app-order-confirmation',
  imports: [CurrencyPipe],
  templateUrl: './order-confirmation.html',
  styleUrl: './order-confirmation.css',
})
export class OrderConfirmation {
  @Input() items: CartItem[] = [];
  @Input() total = 0;

  @Output() newOrder = new EventEmitter<void>();
}
