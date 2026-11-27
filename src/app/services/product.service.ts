import { Injectable } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { PRODUCTS } from '../data/products';
import { Product } from '../models/product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  /** The catalogue as a stream: emits the product list once, then completes. */
  readonly products$: Observable<readonly Product[]> = of(PRODUCTS);

  /** Products whose name or category contains the term. Expects a lowercase term; '' matches all. */
  search(term: string): Observable<readonly Product[]> {
    return this.products$.pipe(
      map((products) =>
        products.filter((product) =>
          `${product.name} ${product.category}`.toLowerCase().includes(term),
        ),
      ),
    );
  }
}
