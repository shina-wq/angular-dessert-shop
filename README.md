# Dessert Shop

A responsive dessert shop built with Angular. Browse desserts, add them to your cart, adjust quantities and confirm your order.

- **Live site:** https://angular-dessert-shop.vercel.app/
- **Repository:** https://github.com/shina-wq/angular-dessert-shop

## Features

- Product list rendered from typed data, with responsive mobile / tablet / desktop images
- Add to cart, then increase or decrease the quantity right on the product card
- Products already in the cart are highlighted with a red border
- Cart shows each item, line totals and the order total, and updates instantly
- Remove single items from the cart
- Order confirmation modal with a summary; "Start New Order" resets everything
- Prices formatted as US dollars with Angular's `currency` pipe (e.g. `$6.50`)
- Responsive layout from 320px phones to large desktops, with hover and keyboard focus states

## Built with

- [Angular 22](https://angular.dev) (standalone components)
- TypeScript
- Plain CSS with custom properties
- Red Hat Text font

## Angular concepts used

| Concept | Where |
| --- | --- |
| Components | `ProductList`, `ProductCard`, `Cart`, `OrderConfirmation` in `src/app/components/` |
| Interpolation | `{{ product.name }}`, `{{ item.quantity }}x` |
| Property binding | `[src]`, `[srcset]`, `[product]`, `[items]`, `[attr.aria-label]` |
| Event binding | `(click)`, `(add)`, `(remove)`, `(confirm)` |
| Built-in control flow | `@for` (with `@empty` for "no products") renders products and cart items, `@if` / `@else` shows the empty cart, the stepper and the modal |
| Attribute directive | `[ngClass]="{ 'in-cart': quantity > 0 }"` highlights products in the cart |
| Pipes | `currency` formats prices as US dollars |
| Parent → child | `@Input()` passes products, cart items and the total down |
| Child → parent | `@Output()` + `EventEmitter` send add / increment / decrement / remove / confirm up |
| Shared state | The root `App` component owns the cart and all cart logic |

> `@if` / `@for` are the modern built-in replacements for the `*ngIf` / `*ngFor` structural directives (deprecated since Angular 20). They need no imports.

## Project structure

```
src/app/
├── app.ts / app.html            # Parent: owns products, cart and modal state
├── components/
│   ├── product-list/            # Grid of products
│   ├── product-card/            # One dessert with Add to Cart / quantity stepper
│   ├── cart/                    # Cart items, total, Confirm Order
│   └── order-confirmation/      # Confirmation modal
├── data/products.ts             # Dessert data (prices in USD)
└── models/product.ts            # Product and CartItem interfaces
```

## Getting started

Requires Node.js 18 or later.

```bash
git clone https://github.com/shina-wq/angular-dessert-shop.git
cd angular-dessert-shop
npm install
npm start
```

Then open http://localhost:4200.

To create a production build in `dist/angular-dessert-shop/browser`:

```bash
npm run build
```

## Design

Based on the [Product list with cart](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d) challenge by Frontend Mentor.
