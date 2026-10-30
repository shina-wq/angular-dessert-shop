import { CurrencyPipe } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem } from '../../models/product';

@Component({
  imports: [CurrencyPipe],
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.css',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation {
  @Input({ required: true }) items!: CartItem[];
  @Input({ required: true }) total!: number;

  @Output() newOrder = new EventEmitter<void>();
}
