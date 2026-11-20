import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Product } from '../../models/product';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { ProductCard } from '../product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  protected readonly cart = inject(CartService);

  protected readonly products = toSignal(inject(ProductService).products$, { requireSync: true });
  private readonly cartItems = toSignal(this.cart.items$, { requireSync: true });

  protected quantityOf(product: Product): number {
    return this.cartItems().find((item) => item.product.id === product.id)?.quantity ?? 0;
  }
}
