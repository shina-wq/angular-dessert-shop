import { Service } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { Product } from '../models/product';

@Service()
export class ProductService {
  private readonly products: readonly Product[] = PRODUCTS;

  getAll(): readonly Product[] {
    return this.products;
  }
}
