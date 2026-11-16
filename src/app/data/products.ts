import { Product, ProductImage } from '../models/product';

// Every product has the same 4 image sizes, named image-<slug>-<size>.jpg
function images(slug: string): ProductImage {
  const path = `assets/images/image-${slug}`;
  return {
    thumbnail: `${path}-thumbnail.jpg`,
    mobile: `${path}-mobile.jpg`,
    tablet: `${path}-tablet.jpg`,
    desktop: `${path}-desktop.jpg`,
  };
}

// Prices in US dollars (USD). Each id must be unique: it's how the app tells
// products apart (names are display text and could repeat).
export const PRODUCTS: Product[] = [
  { id: 1, name: 'Waffle with Berries', category: 'Waffle', price: 6.5, image: images('waffle') },
  {
    id: 2,
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7,
    image: images('creme-brulee'),
  },
  { id: 3, name: 'Macaron Mix of Five', category: 'Macaron', price: 8, image: images('macaron') },
  { id: 4, name: 'Classic Tiramisu', category: 'Tiramisu', price: 5.5, image: images('tiramisu') },
  { id: 5, name: 'Pistachio Baklava', category: 'Baklava', price: 4, image: images('baklava') },
  { id: 6, name: 'Lemon Meringue Pie', category: 'Pie', price: 5, image: images('meringue') },
  { id: 7, name: 'Red Velvet Cake', category: 'Cake', price: 4.5, image: images('cake') },
  {
    id: 8,
    name: 'Salted Caramel Brownie',
    category: 'Brownie',
    price: 4.5,
    image: images('brownie'),
  },
  {
    id: 9,
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    image: images('panna-cotta'),
  },
];
