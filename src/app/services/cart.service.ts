import { Injectable, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, distinctUntilChanged, forkJoin, map, skip } from 'rxjs';
import { CartItem, Product } from '../models/product';
import { LoggerService } from './logger.service';
import { ProductService } from './product.service';
import { CART_STORAGE_KEY, StorageService } from './storage.service';
import { UtilService } from './util.service';

interface SavedCartItem {
  id: number;
  quantity: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly util = inject(UtilService);
  private readonly logger = inject(LoggerService);
  private readonly products = inject(ProductService);
  private readonly storage = inject(StorageService);
  private readonly storageKey = inject(CART_STORAGE_KEY);

  /**
   * The single source of truth for the cart. A BehaviorSubject always holds
   * the latest value, so every new subscriber gets the current cart at once.
   */
  private readonly itemsSubject = new BehaviorSubject<readonly CartItem[]>([]);

  readonly items$ = this.itemsSubject.asObservable();

  readonly count$ = this.items$.pipe(
    map((items) => this.util.itemCount(items)),
    distinctUntilChanged(),
  );

  readonly total$ = this.items$.pipe(
    map((items) => this.util.orderTotal(items)),
    distinctUntilChanged(),
  );

  readonly isEmpty$ = this.items$.pipe(
    map((items) => items.length === 0),
    distinctUntilChanged(),
  );

  constructor() {
    this.restore();

    // Save every change. skip(1) ignores the value the BehaviorSubject replays
    // on subscribe, which is the cart we just restored.
    this.items$
      .pipe(skip(1), takeUntilDestroyed())
      .subscribe((items) => this.save(items));
  }

  /** The cart right now, for one-off checks such as confirming an order. */
  get currentItems(): readonly CartItem[] {
    return this.itemsSubject.value;
  }

  add(product: Product): void {
    if (this.find(product)) {
      this.increment(product);
      return;
    }
    this.itemsSubject.next([...this.currentItems, { product, quantity: 1 }]);
    this.logger.info(`Added ${product.name} to cart`);
  }

  increment(product: Product): void {
    this.changeQuantity(product, 1);
  }

  decrement(product: Product): void {
    this.changeQuantity(product, -1);
  }

  remove(product: Product): void {
    if (!this.find(product)) {
      this.logger.warn(`Tried to remove ${product.name}, which is not in the cart`);
      return;
    }
    this.itemsSubject.next(this.currentItems.filter((item) => !this.matches(item, product)));
    this.logger.info(`Removed ${product.name} from cart`);
  }

  clear(): void {
    this.itemsSubject.next([]);
    this.logger.info('Cart cleared');
  }

  private changeQuantity(product: Product, delta: number): void {
    const item = this.find(product);
    if (!item) {
      this.logger.warn(`Tried to change ${product.name}, which is not in the cart`);
      return;
    }

    const quantity = item.quantity + delta;

    if (quantity <= 0) {
      this.remove(product);
      return;
    }

    this.itemsSubject.next(
      this.currentItems.map((item) => (this.matches(item, product) ? { ...item, quantity } : item)),
    );
    this.logger.info(`${product.name} quantity is now ${quantity}`);
  }

  /**
   * Loads the cart saved on the last visit. forkJoin waits for the catalogue
   * and the saved entries, then emits once and completes, so this subscription
   * cleans itself up.
   */
  private restore(): void {
    forkJoin([this.products.products$, this.storage.read<unknown>(this.storageKey)])
      .pipe(map(([catalogue, saved]) => this.toCartItems(saved, catalogue)))
      .subscribe((items) => {
        if (items.length > 0) {
          this.logger.info(`Restored ${items.length} cart item(s) from your last visit`);
        }
        this.itemsSubject.next(items);
      });
  }

  private save(items: readonly CartItem[]): void {
    if (items.length === 0) {
      this.storage.remove(this.storageKey);
      return;
    }

    const saved: SavedCartItem[] = items.map((item) => ({
      id: item.product.id,
      quantity: item.quantity,
    }));
    this.storage.set(this.storageKey, saved);
  }

  /** Keeps only saved entries that still match a product and have a valid quantity. */
  private toCartItems(saved: unknown, catalogue: readonly Product[]): CartItem[] {
    if (!Array.isArray(saved)) return [];

    const items: CartItem[] = [];

    for (const entry of saved) {
      const product = catalogue.find((p) => p.id === entry?.id);
      const quantity = entry?.quantity;

      if (product && Number.isInteger(quantity) && quantity > 0) {
        items.push({ product, quantity });
      }
    }
    return items;
  }

  private find(product: Product): CartItem | undefined {
    return this.currentItems.find((item) => this.matches(item, product));
  }

  private matches(item: CartItem, product: Product): boolean {
    return item.product.id === product.id;
  }
}
