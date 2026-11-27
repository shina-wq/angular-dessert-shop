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

  protected readonly searchTerms = new Subject<string>();

  private readonly results$ = this.searchTerms.pipe(
    debounceTime(500),
    map((term) => term.trim().toLowerCase()),
    startWith(''),
    distinctUntilChanged(),
    switchMap((term) =>
      this.productService.search(term).pipe(
        map((products) => ({ term, products })),
        tap(({ products }) => {
          if (term) this.logger.info(`Search "${term}" found ${products.length} dessert(s)`);
        }),
      ),
    ),
  );

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
