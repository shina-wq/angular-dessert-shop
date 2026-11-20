import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  Subject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
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

  /**
   * Search results joined with the cart: combineLatest re-emits whenever
   * either side changes, so a new search or a cart update both refresh the
   * quantity shown on each card.
   */
  private readonly view$ = combineLatest([this.results$, this.cart.items$]).pipe(
    map(([{ term, products }, items]) => {
      const quantities = new Map(items.map((item) => [item.product.id, item.quantity]));
      return {
        term,
        cards: products.map((product) => ({ product, quantity: quantities.get(product.id) ?? 0 })),
      };
    }),
  );

  protected readonly view = toSignal(this.view$, { requireSync: true });
}
