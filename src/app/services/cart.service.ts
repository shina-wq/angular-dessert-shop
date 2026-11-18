import { Injectable, computed, effect, inject, signal } from '@angular/core';
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
  
  private readonly _items = signal<CartItem[]>(this.restore());

  readonly items = this._items.asReadonly();

  readonly count = computed(() => this.util.sum(this._items(), (item) => item.quantity));

  readonly total = computed(() =>
    this.util.roundToCents(this.util.sum(this._items(), (item) => this.util.lineTotal(item))),
  );

  readonly isEmpty = computed(() => this._items().length === 0);

  constructor() {
    effect(() => {
      const items = this._items();

      if (items.length === 0) {
        this.storage.remove(this.storageKey);
        return;
      }

      const saved: SavedCartItem[] = items.map((item) => ({
        id: item.product.id,
        quantity: item.quantity,
      }));
      this.storage.set(this.storageKey, saved);
    });
  }

  quantityOf(product: Product): number {
    return this.find(product)?.quantity ?? 0;
  }

  add(product: Product): void {
    if (this.find(product)) {
      this.increment(product);
      return;
    }
    this._items.update((items) => [...items, { product, quantity: 1 }]);
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
    this._items.update((items) => items.filter((item) => !this.matches(item, product)));
    this.logger.info(`Removed ${product.name} from cart`);
  }

  clear(): void {
    this._items.set([]);
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

    this._items.update((items) =>
      items.map((item) => (this.matches(item, product) ? { ...item, quantity } : item)),
    );
    this.logger.info(`${product.name} quantity is now ${quantity}`);
  }

  private restore(): CartItem[] {
    const saved = this.storage.get<unknown>(this.storageKey);
    if (!Array.isArray(saved)) return [];

    const catalogue = this.products.getAll();
    const items: CartItem[] = [];

    for (const entry of saved) {
      const product = catalogue.find((p) => p.id === entry?.id);
      const quantity = entry?.quantity;

      if (product && Number.isInteger(quantity) && quantity > 0) {
        items.push({ product, quantity });
      }
    }

    if (items.length > 0) {
      this.logger.info(`Restored ${items.length} cart item(s) from your last visit`);
    }
    return items;
  }

  private find(product: Product): CartItem | undefined {
    return this._items().find((item) => this.matches(item, product));
  }

  private matches(item: CartItem, product: Product): boolean {
    return item.product.id === product.id;
  }
}
