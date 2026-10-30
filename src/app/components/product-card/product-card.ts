import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from '../../models/product';

@Component({
  imports: [NgClass, CurrencyPipe],
  selector: 'app-product-card',
  styleUrl: './product-card.css',
  templateUrl: './product-card.html',
})
export class ProductCard {
  @Input({ required: true }) product!: Product;
  @Input() quantity = 0;

  @Output() add = new EventEmitter<void>();
  @Output() increment = new EventEmitter<void>();
  @Output() decrement = new EventEmitter<void>();
}
