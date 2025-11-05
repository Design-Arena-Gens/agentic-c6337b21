'use client';

import { useParams, useRouter } from 'next/navigation';
import { getProductById } from '@/lib/products';
import styles from './page.module.css';

export default function ProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = parseInt(params.id as string);
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className={styles.container}>
        <div className={styles.notFound}>Product not found</div>
      </div>
    );
  }

  const handleAddToCart = () => {
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
    router.push('/cart');
  };

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>

        <div className={styles.product}>
          <div className={styles.imageWrapper}>
            <img src={product.image} alt={product.name} className={styles.image} />
          </div>

          <div className={styles.details}>
            <span className={styles.category}>{product.category}</span>
            <h1 className={styles.name}>{product.name}</h1>
            <p className={styles.description}>{product.description}</p>

            <div className={styles.priceSection}>
              <span className={styles.price}>${product.price.toFixed(2)}</span>
            </div>

            <button onClick={handleAddToCart} className={styles.addButton}>
              Add to Cart
            </button>

            <div className={styles.features}>
              <h3 className={styles.featuresTitle}>Product Features:</h3>
              <ul className={styles.featuresList}>
                <li>Free shipping on orders over $50</li>
                <li>30-day return policy</li>
                <li>1-year warranty included</li>
                <li>Secure payment processing</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
