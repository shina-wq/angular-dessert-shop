# Dessert Shop

A responsive dessert shop built with Angular and RxJS. Browse and search desserts, add them to your cart, adjust quantities and confirm your order.

This version upgrades the app to **reactive programming with RxJS**. Products, cart and order state are Observable streams, and the UI updates automatically whenever they change.

## Features

- Product grid with responsive mobile, tablet and desktop images
- Live search by name or category, debounced while you type
- Add to cart, then change the quantity right on the product card
- Cart with line totals and order total that update instantly
- Order confirmation modal, and "Start New Order" to reset
- The cart is saved in local storage and restored on your next visit
- Keyboard-friendly, with visible focus states throughout

## Tech stack

- [Angular 22](https://angular.dev) (standalone components, zoneless)
- [RxJS 7](https://rxjs.dev)
- TypeScript, plain CSS

## How RxJS is used

Services expose Observables. Components read them with `toSignal()`, which subscribes for them and unsubscribes when the component is destroyed.

| Where            | What it does                                                                                                                               | Operators                                                               |
| ---------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------- |
| `CartService`    | Holds the cart in a `BehaviorSubject`, so every subscriber gets the latest cart at once. Count, total and empty state are derived streams. | `map`, `distinctUntilChanged`                                           |
| `CartService`    | Restores the saved cart once the catalogue and storage have both loaded, and saves every change after that.                                | `forkJoin`, `skip`, `takeUntilDestroyed`                                |
| `StorageService` | Reads local storage lazily and falls back to an empty cart if the saved data is broken.                                                    | `defer`, `catchError`, `of`                                             |
| `ProductList`    | Turns keystrokes into search results, and only searches once typing pauses.                                                                | `debounceTime`, `distinctUntilChanged`, `startWith`, `switchMap`, `tap` |
| `ProductList`    | Joins search results with the cart so each card shows its quantity.                                                                        | `combineLatest`, `map`                                                  |
| `OrderService`   | Tracks whether the order confirmation is open.                                                                                             | `BehaviorSubject`                                                       |

## Project structure

```
src/app/
├── app.ts / app.html            # Layout: product list, cart, confirmation modal
├── app.config.ts                # App-wide providers
├── components/
│   ├── product-list/            # Search + product grid (search and combine streams)
│   ├── product-search/          # Search input
│   ├── product-card/            # One dessert with its quantity stepper
│   ├── cart/                    # Cart items, total, Confirm Order
│   └── order-confirmation/      # Confirmation modal
├── services/
│   ├── product.service.ts       # Catalogue and search as Observables
│   ├── cart.service.ts          # Cart state (BehaviorSubject)
│   ├── order.service.ts         # Order confirmation state
│   ├── storage.service.ts       # Safe local storage access
│   ├── logger.service.ts        # Logs user actions and errors
│   └── util.service.ts          # Price and total helpers
├── data/products.ts             # Dessert data
└── models/product.ts            # Product and CartItem types
```

## Getting started

Requires Node.js 18 or later.

```bash
git clone https://github.com/shina-wq/angular-dessert-shop-v3.git
cd angular-dessert-shop-v3
npm install
npm start
```

Then open http://localhost:4200.

| Command         | Description                                             |
| --------------- | ------------------------------------------------------- |
| `npm start`     | Run the dev server                                      |
| `npm run build` | Production build in `dist/angular-dessert-shop/browser` |

## Design

Based on the [Product list with cart](https://www.frontendmentor.io/challenges/product-list-with-cart-5MmqLVAp_d) challenge by Frontend Mentor. The search input is the only addition to the original design, and it's styled to match.
