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

// Prices in Rwandan francs (RWF)
export const PRODUCTS: Product[] = [
  { name: 'Waffle with Berries', category: 'Waffle', price: 9500, image: images('waffle') },
  { name: 'Vanilla Bean Crème Brûlée', category: 'Crème Brûlée', price: 10000, image: images('creme-brulee') },
  { name: 'Macaron Mix of Five', category: 'Macaron', price: 11500, image: images('macaron') },
  { name: 'Classic Tiramisu', category: 'Tiramisu', price: 8000, image: images('tiramisu') },
  { name: 'Pistachio Baklava', category: 'Baklava', price: 6000, image: images('baklava') },
  { name: 'Lemon Meringue Pie', category: 'Pie', price: 7500, image: images('meringue') },
  { name: 'Red Velvet Cake', category: 'Cake', price: 6500, image: images('cake') },
  { name: 'Salted Caramel Brownie', category: 'Brownie', price: 6500, image: images('brownie') },
  { name: 'Vanilla Panna Cotta', category: 'Panna Cotta', price: 9500, image: images('panna-cotta') },
];
