import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { LoggerService } from '../../services/logger.service';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../product-card/product-card';
import { ProductSearch } from '../product-search/product-search';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard, ProductSearch],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected readonly cart = inject(CartService);
  private readonly productService = inject(ProductService);
  private readonly logger = inject(LoggerService);

  /** Every keystroke from the search box. */
  protected readonly searchTerms = new Subject<string>();

  private readonly results$ = this.searchTerms.pipe(
    debounceTime(300), // wait until typing pauses
    map((term) => term.trim().toLowerCase()),
    startWith(''), // show everything before the first search
    distinctUntilChanged(), // "cake" → "cake " → "cake" searches only once
    // A new term replaces the previous search, so stale results never arrive late.
    switchMap((term) =>
      this.productService.search(term).pipe(
        map((products) => ({ term, products })),
        tap(({ products }) => {
          if (term) this.logger.info(`Search "${term}" found ${products.length} dessert(s)`);
        }),
      ),
    ),
  );

  protected readonly results = toSignal(this.results$, { requireSync: true });
  private readonly cartItems = toSignal(this.cart.items$, { requireSync: true });

  protected quantityOf(product: Product): number {
    return this.cartItems().find((item) => item.product.id === product.id)?.quantity ?? 0;
  }
}
