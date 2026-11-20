import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PRODUCTS } from '../data/products';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  /** The catalogue as a stream: emits the product list once, then completes. */
  readonly products$: Observable<readonly Product[]> = of(PRODUCTS);
}
