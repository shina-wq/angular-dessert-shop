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

// Prices in US dollars (USD)
export const PRODUCTS: Product[] = [
  { name: 'Waffle with Berries', category: 'Waffle', price: 6.5, image: images('waffle') },
  {
    name: 'Vanilla Bean Crème Brûlée',
    category: 'Crème Brûlée',
    price: 7,
    image: images('creme-brulee'),
  },
  { name: 'Macaron Mix of Five', category: 'Macaron', price: 8, image: images('macaron') },
  { name: 'Classic Tiramisu', category: 'Tiramisu', price: 5.5, image: images('tiramisu') },
  { name: 'Pistachio Baklava', category: 'Baklava', price: 4, image: images('baklava') },
  { name: 'Lemon Meringue Pie', category: 'Pie', price: 5, image: images('meringue') },
  { name: 'Red Velvet Cake', category: 'Cake', price: 4.5, image: images('cake') },
  { name: 'Salted Caramel Brownie', category: 'Brownie', price: 4.5, image: images('brownie') },
  {
    name: 'Vanilla Panna Cotta',
    category: 'Panna Cotta',
    price: 6.5,
    image: images('panna-cotta'),
  },
];
