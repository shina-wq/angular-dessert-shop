import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { ProductCard } from '../product-card/product-card';

@Component({
  imports: [ProductCard],
  selector: 'app-product-list',
  styleUrl: './product-list.css',
  templateUrl: './product-list.html',
})
export class ProductList {
  @Input({ required: true }) products!: Product[];
}
