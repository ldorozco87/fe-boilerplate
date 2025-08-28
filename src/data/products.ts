import { Product } from '@/types/ecommerce';

export const products: Product[] = [
  {
    id: '1',
    name: 'Modern Wireless Headphones',
    description:
      'Premium noise-cancelling wireless headphones with superior sound quality and long battery life.',
    price: 299.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.8,
    reviews: 248,
    inStock: true,
    featured: true,
  },
  {
    id: '2',
    name: 'Smart Fitness Tracker',
    description:
      'Advanced fitness tracker with heart rate monitoring, GPS, and waterproof design.',
    price: 199.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.6,
    reviews: 132,
    inStock: true,
    featured: true,
  },
  {
    id: '3',
    name: 'Organic Cotton T-Shirt',
    description:
      'Soft, comfortable organic cotton t-shirt in various colors. Perfect for everyday wear.',
    price: 29.99,
    image: '/api/placeholder/300/300',
    category: 'Clothing',
    rating: 4.4,
    reviews: 89,
    inStock: true,
  },
  {
    id: '4',
    name: 'Eco-Friendly Water Bottle',
    description:
      'Sustainable stainless steel water bottle that keeps drinks cold for 24 hours.',
    price: 39.99,
    image: '/api/placeholder/300/300',
    category: 'Lifestyle',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    featured: true,
  },
  {
    id: '5',
    name: 'Wireless Charging Pad',
    description:
      'Fast wireless charging pad compatible with all Qi-enabled devices.',
    price: 49.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.3,
    reviews: 67,
    inStock: true,
  },
  {
    id: '6',
    name: 'Minimalist Backpack',
    description:
      'Sleek and functional backpack perfect for work, travel, or daily use.',
    price: 89.99,
    image: '/api/placeholder/300/300',
    category: 'Accessories',
    rating: 4.5,
    reviews: 203,
    inStock: true,
  },
  {
    id: '7',
    name: 'Plant-Based Protein Powder',
    description:
      'High-quality plant-based protein powder with all essential amino acids.',
    price: 34.99,
    image: '/api/placeholder/300/300',
    category: 'Health',
    rating: 4.2,
    reviews: 94,
    inStock: false,
  },
  {
    id: '8',
    name: 'Smart Home Speaker',
    description:
      'Voice-controlled smart speaker with premium sound and home automation features.',
    price: 129.99,
    image: '/api/placeholder/300/300',
    category: 'Electronics',
    rating: 4.6,
    reviews: 187,
    inStock: true,
    featured: true,
  },
  {
    id: '9',
    name: 'Yoga Mat Pro',
    description: 'Premium non-slip yoga mat made from eco-friendly materials.',
    price: 79.99,
    image: '/api/placeholder/300/300',
    category: 'Lifestyle',
    rating: 4.8,
    reviews: 112,
    inStock: true,
  },
  {
    id: '10',
    name: 'Stainless Steel Cookware Set',
    description:
      'Professional-grade stainless steel cookware set for the modern kitchen.',
    price: 249.99,
    image: '/api/placeholder/300/300',
    category: 'Home',
    rating: 4.7,
    reviews: 76,
    inStock: true,
  },
  {
    id: '11',
    name: 'LED Desk Lamp',
    description:
      'Adjustable LED desk lamp with multiple brightness levels and USB charging port.',
    price: 59.99,
    image: '/api/placeholder/300/300',
    category: 'Home',
    rating: 4.4,
    reviews: 158,
    inStock: true,
  },
  {
    id: '12',
    name: 'Premium Coffee Beans',
    description: 'Single-origin premium coffee beans roasted to perfection.',
    price: 24.99,
    image: '/api/placeholder/300/300',
    category: 'Food',
    rating: 4.9,
    reviews: 234,
    inStock: true,
  },
];

export const categories = [
  'All',
  'Electronics',
  'Clothing',
  'Lifestyle',
  'Accessories',
  'Health',
  'Home',
  'Food',
];

export const getFeaturedProducts = () =>
  products.filter((product) => product.featured);
export const getProductsByCategory = (category: string) =>
  category === 'All'
    ? products
    : products.filter((product) => product.category === category);
export const getProductById = (id: string) =>
  products.find((product) => product.id === id);
