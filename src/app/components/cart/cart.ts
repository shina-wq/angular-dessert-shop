import { Component, Input } from '@angular/core';
import { CartItem } from '../../models/product';

@Component({
  selector: 'app-cart',
  styleUrl: './cart.css',
  templateUrl: './cart.html',
})
export class Cart {
  @Input({ required: true }) items!: CartItem[];
}
