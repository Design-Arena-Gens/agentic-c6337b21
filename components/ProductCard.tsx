'use client';

import Link from 'next/link';
import { Product } from '@/lib/products';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();

    const cart = localStorage.getItem('cart');
    const items = cart ? JSON.parse(cart) : [];

    const existingItem = items.find((item: any) => item.productId === product.id);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      items.push({
        productId: product.id,
        quantity: 1,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }

    localStorage.setItem('cart', JSON.stringify(items));
    window.dispatchEvent(new Event('cartUpdated'));

    if (onAddToCart) {
      onAddToCart(product);
    }
  };

  return (
    <Link href={`/product/${product.id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img src={product.image} alt={product.name} className={styles.image} />
      </div>
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.category}>{product.category}</p>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          <button onClick={handleAddToCart} className={styles.button}>
            Add to Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
