import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CartItem, Product } from '../../models/product';

@Component({
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  @Input({ required: true }) items!: CartItem[];

  @Output() remove = new EventEmitter<Product>();
  @Output() clear = new EventEmitter<void>();
}
