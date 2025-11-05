'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import styles from './Header.module.css';

export default function Header() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cart = localStorage.getItem('cart');
      if (cart) {
        const items = JSON.parse(cart);
        const count = items.reduce((sum: number, item: any) => sum + item.quantity, 0);
        setCartCount(count);
      }
    };

    updateCartCount();
    window.addEventListener('cartUpdated', updateCartCount);

    return () => window.removeEventListener('cartUpdated', updateCartCount);
  }, []);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoIcon}>🛍️</span>
          <span>E-Shop</span>
        </Link>
        <nav className={styles.nav}>
          <Link href="/" className={styles.navLink}>Home</Link>
          <Link href="/cart" className={styles.navLink}>
            Cart {cartCount > 0 && <span className={styles.badge}>{cartCount}</span>}
          </Link>
        </nav>
      </div>
    </header>
  );
}
