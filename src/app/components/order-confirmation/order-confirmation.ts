import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/product';

@Component({
  selector: 'app-order-confirmation',
  styleUrl: './order-confirmation.css',
  templateUrl: './order-confirmation.html',
})
export class OrderConfirmation {
  @Input({ required: true }) items!: CartItem[];
}
