'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { CartItem } from '@/lib/cart';
import styles from './page.module.css';

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = () => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCartItems(JSON.parse(cart));
    }
  };

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    const updatedItems = cartItems.map(item =>
      item.productId === productId ? { ...item, quantity: newQuantity } : item
    );

    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const removeItem = (productId: number) => {
    const updatedItems = cartItems.filter(item => item.productId !== productId);
    setCartItems(updatedItems);
    localStorage.setItem('cart', JSON.stringify(updatedItems));
    window.dispatchEvent(new Event('cartUpdated'));
  };

  const getTotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    alert('Checkout functionality coming soon! Total: $' + getTotal().toFixed(2));
  };

  if (cartItems.length === 0) {
    return (
      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Shopping Cart</h1>
          <div className={styles.empty}>
            <p>Your cart is empty</p>
            <button onClick={() => router.push('/')} className={styles.shopButton}>
              Continue Shopping
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>

        <div className={styles.content}>
          <div className={styles.items}>
            {cartItems.map(item => (
              <div key={item.productId} className={styles.item}>
                <img src={item.image} alt={item.name} className={styles.image} />

                <div className={styles.itemDetails}>
                  <h3 className={styles.itemName}>{item.name}</h3>
                  <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>
                </div>

                <div className={styles.quantity}>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className={styles.quantityButton}
                  >
                    −
                  </button>
                  <span className={styles.quantityValue}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className={styles.quantityButton}
                  >
                    +
                  </button>
                </div>

                <div className={styles.itemTotal}>
                  ${(item.price * item.quantity).toFixed(2)}
                </div>

                <button
                  onClick={() => removeItem(item.productId)}
                  className={styles.removeButton}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className={styles.summary}>
            <h2 className={styles.summaryTitle}>Order Summary</h2>

            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${getTotal().toFixed(2)}</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>Free</span>
            </div>

            <div className={styles.summaryRow}>
              <span>Tax</span>
              <span>${(getTotal() * 0.08).toFixed(2)}</span>
            </div>

            <div className={styles.summaryDivider}></div>

            <div className={styles.summaryTotal}>
              <span>Total</span>
              <span>${(getTotal() * 1.08).toFixed(2)}</span>
            </div>

            <button onClick={handleCheckout} className={styles.checkoutButton}>
              Proceed to Checkout
            </button>

            <button onClick={() => router.push('/')} className={styles.continueButton}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
